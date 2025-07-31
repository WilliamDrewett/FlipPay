import * as dotenv from 'dotenv';
dotenv.config();

import { Keyring } from "@polkadot/keyring"
import { Context, contextConfigFor, historyV2, toPolkadotV2 } from "@snowbridge/api"
import { formatEther, Wallet } from "ethers"
import { cryptoWaitReady } from "@polkadot/util-crypto"
import { assetRegistryFor } from "@snowbridge/registry"
import { setTimeout } from "timers/promises"

const [, , environment, token_contract, destination_parachain, amountStr] = process.argv

if (!environment || !token_contract || !destination_parachain || !amountStr) {
    // Throw an error and exit gracefully if the script is not called correctly
    console.error("Usage: ts-node script.ts <environment> <token_contract> <destination_parachain> <amount>")
    process.exit(1)
}

;(async () => {
    // Initialize polkadot-js crypto
    await cryptoWaitReady()

    // Get the registry of parachains and assets.
    const registry = assetRegistryFor(environment)

    // Initialize the context which establishes and pool connections
    const context = new Context(contextConfigFor(environment))
    console.log("GraphQL endpoint:", context.graphqlApiUrl())

    // Initialize ethereum wallet.
    const ETHEREUM_ACCOUNT = new Wallet(
        process.env.ETHEREUM_KEY ?? "Your Key Goes Here",
        context.ethereum()
    )

    const ETHEREUM_ACCOUNT_PUBLIC = await ETHEREUM_ACCOUNT.getAddress()

    // Initialize substrate wallet.
    const polkadot_keyring = new Keyring({ type: "sr25519" })
    const POLKADOT_ACCOUNT = polkadot_keyring.addFromUri(
        process.env.SUBSTRATE_KEY ?? "Your Key Goes Here"
    )
    const POLKADOT_ACCOUNT_PUBLIC = POLKADOT_ACCOUNT.address

    console.log("eth", ETHEREUM_ACCOUNT_PUBLIC, "sub", POLKADOT_ACCOUNT_PUBLIC)

    // Select the token you want to send.
    const TOKEN_CONTRACT = token_contract

    // Select the destination parachain.
    const DESTINATION_PARACHAIN = parseInt(destination_parachain, 10)

    console.log("# Ethereum to Asset Hub")
    // Step 1. Get the delivery fee for the transaction
    const fee = await toPolkadotV2.getDeliveryFee(
        context, // The context
        registry, // Asset registry
        TOKEN_CONTRACT, // The erc20 token contract address
        DESTINATION_PARACHAIN // Destination parachain
    )

    // Step 2. Create a transfer tx
    const amount = BigInt(amountStr)
    const transfer = await toPolkadotV2.createTransfer(
        registry, // Asset registry
        ETHEREUM_ACCOUNT_PUBLIC, // Source account
        POLKADOT_ACCOUNT_PUBLIC, // Destination account
        TOKEN_CONTRACT, // The erc20 token contract address
        DESTINATION_PARACHAIN, // Destination parachain
        amount, // Transfer Amount
        fee // The delivery fee
    )

    // Step 3. Validate the transaction by dry-running on source and destination.
    const validation = await toPolkadotV2.validateTransfer(
        context, // The context
        transfer // The transfer tx
    )
    console.log("validation result", validation)

    // Step 4. Check validation logs for dry errors
    if (!validation.success) {
        console.error(validation.logs)
        throw Error(`validation has one of more errors.`)
    }

    if (process.env.SMOKE_TEST === "1") {
        console.log("Smoke test flag detected: skipping transaction submission.")
        // Clean up connections since we are not sending the transaction.
        await context.destroyContext()
        process.exit(0)
    }

    // Estimate the cost of the execution cost of the transaction
    const {
        tx,
        computed: { totalValue },
    } = transfer

    // Viewing gas and tx cost
    console.log("tx:", tx)
    console.log("Gas price quoted:", validation.data.feeInfo?.feeData.toJSON())
    console.log("Transaction Gas Cost:", validation.data.feeInfo?.estimatedGas)

    console.log("Delivery Fee:", formatEther(fee.totalFeeInWei))
    console.log("Execution Fee:", formatEther(validation.data.feeInfo?.executionFee ?? 0n))
    console.log(
        "Total cost:",
        formatEther(fee.totalFeeInWei + (validation.data.feeInfo?.executionFee ?? 0n))
    )
    console.log("Ether sent:", formatEther(totalValue - fee.totalFeeInWei))

    // Step 5. Submit the transaction
    const response = await ETHEREUM_ACCOUNT.sendTransaction(tx)
    const receipt = await response.wait(1)
    if (!receipt) {
        throw Error(`Transaction ${response.hash} not included.`)
    }

    // Step 6. Get the message receipt for tracking purposes
    const message = await toPolkadotV2.getMessageReceipt(receipt)
    if (!message) {
        throw Error(`Transaction ${receipt.hash} did not emit a message.`)
    }
    console.log(
        `Success message with message id: ${message.messageId}
                block number: ${message.blockNumber}
                tx hash: ${message.txHash}`
    )

    // Step 7. Poll for message completion
    while (true) {
        const status = await historyV2.toPolkadotTransferById(
            context.graphqlApiUrl(), // GraphQL endpoint to query
            message.messageId
        )
        if (status !== undefined && status.status !== historyV2.TransferStatus.Pending) {
            console.dir(status, { depth: 100 })
            console.log("tx complete:", historyV2.TransferStatus[status.status])
            break
        }
        console.dir(status, { depth: 100 })
        console.log("waiting for tx to be completed...")
        await setTimeout(60_000) // Wait 60 seconds between requests
    }

    // Clean up all open connections
    await context.destroyContext()
})()