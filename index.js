import {
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  defineChain,
  formatEther,
} from "https://esm.sh/viem";
import { contractAddress, abi } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const ethAmountInput = document.getElementById("ethAmount");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");

let walletClient;
let publicClient;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });

    await walletClient.requestAddresses();
    connectButton.innerHTML = "CONNECTED!";
  } else {
    connectButton.innerHTML = "Please install MetaMask to use this feature.";
  }
}

async function fund() {
  const ethAmount = ethAmountInput.value;
  console.log(`Funding with ${ethAmount} ETH...`);

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });

    const [connectedAccount] = await walletClient.requestAddresses();
    const currentChain = await getCurrentChain(walletClient);

    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });

    // First, verify the contract exists
    const code = await publicClient.getBytecode({
      address: contractAddress,
    });

    if (!code || code === "0x") {
      alert("Contract not found! Did you start Anvil with --load-state?");
      console.error("No contract at address:", contractAddress);
      return;
    }

    console.log("Contract found, simulating transaction...");

    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi,
      functionName: "fund",
      account: connectedAccount,
      chain: currentChain,
      value: parseEther(ethAmount),
    });

    const hash = await walletClient.writeContract(request);
    console.log("Transaction sent:", hash);
  } else {
    connectButton.innerHTML = "Please install MetaMask to use this feature.";
  }
}

async function getCurrentChain(client) {
  const chainId = await client.getChainId();
  const currentChain = defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["http://localhost:8545"],
      },
    },
  });
  return currentChain;
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });
    const balance = await publicClient.getBalance({
      address: contractAddress,
    });
    console.log(`Contract balance: ${formatEther(balance)} ETH`);
  } else {
    connectButton.innerHTML = "Please install MetaMask to use this feature.";
  }
}

async function withdraw() {
  console.log("Withdrawing funds...");

  if (typeof window.ethereum !== "undefined") {
    try {
      walletClient = createWalletClient({
        transport: custom(window.ethereum),
      });

      const [connectedAccount] = await walletClient.requestAddresses();
      const currentChain = await getCurrentChain(walletClient);

      publicClient = createPublicClient({
        transport: custom(window.ethereum),
      });

      console.log("Simulating withdrawal...");

      const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi,
        functionName: "withdraw",
        account: connectedAccount,
        chain: currentChain,
      });

      console.log("Simulation successful, sending transaction...");

      const hash = await walletClient.writeContract(request);
      console.log("Transaction sent:", hash);

      // Wait for confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      console.log("Transaction confirmed:", receipt);
    } catch (error) {
      console.error("Withdrawal error:", error);
    }
  } else {
    alert("Please install MetaMask");
  }
} // Event Listeners
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;
