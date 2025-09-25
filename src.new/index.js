import { createWeb3Modal } from "@web3modal/standalone";
import { ethers } from "ethers";

const CONFIG = {
    WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
    LIFI_API_URL: process.env.LIFI_API_URL,
    LIFI_INTEGRATOR: process.env.LIFI_INTEGRATOR,
    LIFI_CHAINS: process.env.LIFI_CHAINS.split(",").map(Number),
    LIFI_TOKENS: process.env.LIFI_TOKENS.split(","),
    VITE_FEE_COLLECTOR_ADDRESS: process.env.VITE_FEE_COLLECTOR_ADDRESS
};

let web3Modal, currentProvider, currentSigner, allChains = [], allTokens = {};

async function init() {
    web3Modal = createWeb3Modal({
        projectId: CONFIG.WALLETCONNECT_PROJECT_ID
    });

    web3Modal.subscribeProvider(async ({ provider, isConnected }) => {
        if (isConnected) await onWalletConnected(provider);
    });

    document.getElementById("connect-wallet-btn").addEventListener("click", () => web3Modal.open());
    await loadLIWidget();
}

async function loadLIWidget() {
    const widgetHTML = `
        <!-- LI.FI Widget UI -->
        <div class="glass-container p-4 rounded-xl">
            <h2 class="text-xl font-bold mb-4">LI.FI Swap Widget</h2>
            <p class="mb-4">Cross-chain swaps made simple.</p>
            <div id="lifi-widget"></div>
        </div>
    `;
    document.getElementById("widget-screen").innerHTML = widgetHTML;
    document.getElementById("widget-screen").classList.remove("hidden");
}

async function onWalletConnected(provider) {
    currentProvider = new ethers.providers.Web3Provider(provider);
    currentSigner = currentProvider.getSigner();
    const address = await currentSigner.getAddress();
    console.log("Connected wallet:", address);
}

init();
