// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import {IEscrowFactory} from "../contracts/lib/cross-chain-swap/contracts/interfaces/IEscrowFactory.sol";
import {IOrderMixin} from "limit-order-protocol/contracts/interfaces/IOrderMixin.sol";

import { IERC20 } from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import { TestEscrowFactory } from "../contracts/src/TestEscrowFactory.sol";
import { Resolver } from "../contracts/src/Resolver.sol";

contract DeployEscrowAndResolver is Script {
    // Set your constructor parameters here
    address constant LOP = 0x6af572bE6497d4Da120e51f310c6839E211E97AA;
    address constant ACCESS_TOKEN = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238; // Replace if needed
    address constant FEE_TOKEN    = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238; // Replace if needed
    address constant OWNER = 0x1ad87A1B6bae98d2Ef1f93f5fA4B4105E34f3477;
    uint32 constant TIMELOCK = 3600;  // Example: 1 hour

    function run() external {
        vm.startBroadcast();

        // Deploy the TestEscrowFactory
        TestEscrowFactory factory = new TestEscrowFactory(
            LOP,
            IERC20(FEE_TOKEN),
            IERC20(ACCESS_TOKEN),
            OWNER,
            TIMELOCK,
            TIMELOCK
        );
        console.log("TestEscrowFactory deployed at:", address(factory));

        // Deploy the Resolver with reference to the factory and timelock
        Resolver resolver = new Resolver(
            IEscrowFactory(address(factory)),
            IOrderMixin(LOP),
            OWNER
        );
        console.log("Resolver deployed at:", address(resolver));

        vm.stopBroadcast();
    }
}
