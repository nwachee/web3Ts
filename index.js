import { createWalletClient, custom, createPublicClient } from "https://esm.sh/viem";
import { contractAddress, abi } from "./constants.js";

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');
const ethAmountInput = document.getElementById('ethAmount');

let walletClient
let createPublicClient 

async function connect() {
    if( typeof window.ethereum !== 'undefined' ) {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });

       await walletClient.requestAddresses()
        connectButton.innerHTML = "CONNECTED!"

    } else {
        connectButton.innerHTML = "Please install MetaMask to use this feature."
    }
}

async function fund() {
    const ethAmount = ethAmountInput.value
    console.log(`Funding with ${ethAmount} ETH...`)

    if( typeof window.ethereum !== 'undefined' ) {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });

       const [connectedAccount] = await walletClient.requestAddresses()

       publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })
   
        await publicClient.simulateContract({
            address : contractAddress,
            abi,
            functionName : 'fund',
            account : connectedAccount
        })
    } else {
        connectButton.innerHTML = "Please install MetaMask to use this feature."
    }
}

    connectButton.onclick = connect 
    fundButton.onclick = fund
