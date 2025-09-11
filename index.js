import { createWalletClient, custom } from "https://esm.sh/viem";

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');

let walletClient 

async function connect() {
    if( typeof window.ethereum !== 'undefined' ) {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });
       await walletClient.requestAddresses()
        connectButton.innerHTML = "Connected."

    } else {
        connectButton.innerHTML = "Please install MetaMask to use this feature."
    }
}

connectButton.onclick = connect 