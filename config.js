// --- APPLICATION CONFIGURATION ---
// This file holds all the settings for your application.
// You can edit these values directly for local development.
// For production, it's recommended to set these in your Azure Application Settings
// and use a build step to generate this file automatically.

window.APP_CONFIG = {
    LIFI_API_URL: "https://li.quest/v1",
    
    // A list of chain IDs your app will support.
    // Example: [1 (ETH), 137 (Polygon), 56 (BSC), 42161 (Arbitrum), 10 (Optimism), 8453 (Base)]
    LIFI_CHAINS: [1, 10, 137, 42161, 56, 8453],
  
    // Your unique integrator name for LI.FI analytics.
    LIFI_INTEGRATOR: "Timax_swap",
  
    // A list of token symbols to feature in the dropdowns.
    LIFI_TOKENS: ["ETH", "USDC", "USDT", "DAI", "MATIC", "BNB", "AVAX", "ARB", "OP"],
  
    // The wallet address where you will collect swap fees.
    FEE_COLLECTOR_ADDRESS: "0x34accc793fD8C2A8e262C8C95b18D706bc6022f0"
  };