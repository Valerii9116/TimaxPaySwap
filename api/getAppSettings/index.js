module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    // Set CORS headers
    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    };
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        context.res.status = 200;
        context.res.body = '';
        return;
    }
    
    try {
        // Get environment variables and return them as JSON
        const appSettings = {
            LIFI_API_URL: process.env.LIFI_API_URL || 'https://li.quest/v1',
            LIFI_APPEARANCE: process.env.LIFI_APPEARANCE || 'auto',
            LIFI_CHAINS: process.env.LIFI_CHAINS || '[1, 10, 137, 42161, 56, 8453]',
            LIFI_INTEGRATOR: process.env.LIFI_INTEGRATOR || 'Timax_swap',
            LIFI_THEME: process.env.LIFI_THEME || 'dark',
            LIFI_TOKENS: process.env.LIFI_TOKENS || '["ETH", "USDC", "USDT", "DAI", "MATIC", "BNB"]',
            LIFI_WIDGET_VERSION: process.env.LIFI_WIDGET_VERSION || 'latest',
            VITE_FEE_COLLECTOR_ADDRESS: process.env.VITE_FEE_COLLECTOR_ADDRESS || '0x34accc793fD8C2A8e262C8C95b18D706bc6022f0'
        };
        
        context.res.status = 200;
        context.res.body = appSettings;
        
    } catch (error) {
        context.log.error('Error retrieving app settings:', error);
        
        context.res.status = 500;
        context.res.body = {
            error: 'Internal server error',
            message: 'Unable to retrieve application settings'
        };
    }
};