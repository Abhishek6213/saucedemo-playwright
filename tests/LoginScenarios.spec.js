const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const dataset = JSON.parse(JSON.stringify(require('../utils/LoginTestData.json')));
const { customtest } = require('../utils/test-base-login');

customtest('Validate Sauce Demo home page title', async ({ page, testDataForLoginPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.validateHomePageTitle(testDataForLoginPage.homePageTitle);
});

customtest('Validate Sauce Demo login for Standard User', async ({ page, testDataForLoginPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(testDataForLoginPage.standardUsername, testDataForLoginPage.password);
    await loginPage.validateLoginForStandardUser(testDataForLoginPage.validationMessageForStanddardUser);
});

customtest('Validate Sauce Demo login for Locked out User', async ({ page, testDataForLoginPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(testDataForLoginPage.locketOutUsername, testDataForLoginPage.password);
    await loginPage.validateLoginForLockedOutUser(testDataForLoginPage.validationMessageForlocketOutUser);
});

customtest('Validate Sauce Demo login for Problem User', async ({ page, testDataForLoginPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(testDataForLoginPage.problemUsername, testDataForLoginPage.password);
    await loginPage.validateLoginForProblemUser(testDataForLoginPage.validationMessageForProblemUser);
});

customtest('Validate Sauce Demo login for Performance Glitch User', async ({ page, testDataForLoginPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(testDataForLoginPage.performanceGlitchUsername, testDataForLoginPage.password);
    await loginPage.validateLoginForPerformanceGlitchUser(testDataForLoginPage.validationMessageForPerformanceGlitchUsername);
});

customtest('Validate Sauce Demo login for Empty User', async ({ page, testDataForLoginPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(testDataForLoginPage.emptyUsername, testDataForLoginPage.emptyPassword);
    await loginPage.validateLoginForEmptyUser(testDataForLoginPage.validationMessageForEmptyUsername);
});

customtest('Validate Sauce Demo login for Empty Password', async ({ page, testDataForLoginPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(testDataForLoginPage.randomUsername, testDataForLoginPage.emptyPassword);
    await loginPage.validateLoginForEmptyPassword(testDataForLoginPage.validationMessageForEmptyPassword);
});

customtest('Validate Sauce Demo login for Random User', async ({ page, testDataForLoginPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(testDataForLoginPage.randomUsername, testDataForLoginPage.randomPassword);
    await loginPage.validateLoginForRandomUser(testDataForLoginPage.validationMessageForInvalidUserNamePassword);
});

customtest('Validate User should not be able to access APIs without logging in', async ({ page, testDataForLoginPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.validateUnauthorizedAccessForAPI(testDataForLoginPage.inventoryAPI, testDataForLoginPage.inventoryAPIMessage);
    await loginPage.validateUnauthorizedAccessForAPI(testDataForLoginPage.cartAPI, testDataForLoginPage.cartAPIMessage);
    await loginPage.validateUnauthorizedAccessForAPI(testDataForLoginPage.checkoutOneAPI, testDataForLoginPage.checkoutOneAPIMessage);
    await loginPage.validateUnauthorizedAccessForAPI(testDataForLoginPage.checkoutTwoAPI, testDataForLoginPage.checkoutTwoAPIMessage);
    await loginPage.validateUnauthorizedAccessForAPI(testDataForLoginPage.checkoutCompleteAPI, testDataForLoginPage.checkoutCompleteAPIMessage);
});
