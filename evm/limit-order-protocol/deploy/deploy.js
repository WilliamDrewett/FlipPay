const hre = require('hardhat');
const { getChainId, network } = hre;

const wethByNetwork = {
    hardhat: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    mainnet: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    sepolia: '0xdd13E55209Fd76AfE204dBda4007C227904f0a81'
};

module.exports = async ({ getNamedAccounts, deployments }) => {
    console.log('running deploy script');
    console.log('network id ', await getChainId());
    
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    
    const limitOrderProtocol = await deploy('LimitOrderProtocol', {
        from: deployer,
        args: [wethByNetwork[network.name]],
    });
    
    console.log('LimitOrderProtocol deployed to:', limitOrderProtocol.address);
    
    if (await getChainId() !== '31337') {
        await hre.run('verify:verify', {
            address: limitOrderProtocol.address,
            constructorArguments: [wethByNetwork[network.name]],
        });
    }
};

// Remove or comment out this line:
// module.exports.skip = async () => true;