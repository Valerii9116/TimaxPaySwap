const { app } = require('@azure/functions');

app.http('getAppSettings', {
    methods: ['GET', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('GetAppSettings function triggered');
        
        // Handle preflight OPTIONS request
        if (request.method === 'OPTIONS') {
            return {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Accept',
                    'Content-Type': 'application/json'
                },
                body: ''
            };
        }
        
        try {
            // Log available environment variables (for debugging)
            context.log('Environment check:', {
                nodeEnv: process.env.NODE_ENV,
                functionAppName: process.env.WEBSITE_SITE_NAME,
                hasLifiApiUrl: !!process.env.LIFI_API_URL,
                hasLifiIntegrator: !!process.env.LIFI_INTEGRATOR,
                hasLifiChains: !!process.env.LIFI_CHAINS,
                hasLifiTokens: !!process.env.LIFI_TOKENS,
                hasFeeCollector: !!process.env.VITE_FEE_COLLECTOR_ADDRESS
            });
            
            // Get environment variables with explicit fallbacks
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
            
            context.log('Returning app settings successfully');
            
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Accept',
                    'Cache-Control': 'no-cache'
                },
                jsonBody: appSettings
            };
            
        } catch (error) {
            context.log.error('Error retrieving app settings:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                jsonBody: {
                    error: 'Internal server error',
                    message: 'Unable to retrieve application settings',
                    details: error.message
                }
            };
        }
    }
});