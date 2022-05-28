const { devices } = require('@playwright/test');

const config = {
    testDir: './tests',
    retries: 1,
    /* Maximum time one test can run for*/
    timeout: 30 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000,
    },
    reporter: 'html',
    projects: [
        {
            name: 'safari',
            use: {
                browserName: 'webkit',
                headless: false,
                screenshot: 'on',
                trace: 'retain-on-failure',
            },
        },

        {
            name: 'chrome',
            use: {
                browserName: 'chromium',
                headless: false,
                screenshot: 'on',
                trace: 'retain-on-failure',
            },
        },

        {
            name: 'firefox',
            use: {
                browserName: 'firefox',
                headless: false,
                screenshot: 'on',
                trace: 'retain-on-failure',
            },
        },
    ],
};

module.exports = config;
