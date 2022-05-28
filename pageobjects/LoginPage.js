const { expect } = require('@playwright/test');
class LoginPage {
    constructor(page) {
        this.page = page;
        this.baseURL = 'https://www.saucedemo.com/';
        this.userName = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.standardUser = page.locator("span[class='title']");
        this.problemUser = page.locator("span[class='title']");
        this.performanceGlitchUser = page.locator("span[class='title']");
        this.lockedOutUser = page.locator("h3[data-test='error']");
        this.emptyUser = page.locator("h3[data-test='error']");
        this.emptyPassword = page.locator("h3[data-test='error']");
        this.randomUser = page.locator("h3[data-test='error']");
        this.apiError = page.locator("h3[data-test='error']");
    }

    async goToLogin() {
        await this.page.goto(this.baseURL);
    }

    async login(username, password) {
        await this.userName.type(username);
        await this.password.type(password);
        await this.loginButton.click();
    }

    async validlogin(username, password, validationMessage) {
        await this.page.goto(this.baseURL);
        await this.userName.type(username);
        await this.password.type(password);
        await this.loginButton.click();
        await expect(this.standardUser).toContainText(validationMessage);
    }

    async validateHomePageTitle(title) {
        await expect(this.page).toHaveTitle(title);
    }

    async validateLoginForStandardUser(validationMessage) {
        await expect(this.standardUser).toContainText(validationMessage);
    }

    async validateLoginForLockedOutUser(validationMessage) {
        await expect(this.lockedOutUser).toContainText(validationMessage);
    }

    async validateLoginForProblemUser(validationMessage) {
        await expect(this.problemUser).toContainText(validationMessage);
    }

    async validateLoginForPerformanceGlitchUser(validationMessage) {
        await expect(this.performanceGlitchUser).toContainText(validationMessage);
    }

    async validateLoginForEmptyUser(validationMessage) {
        await expect(this.emptyUser).toContainText(validationMessage);
    }

    async validateLoginForEmptyPassword(validationMessage) {
        await expect(this.emptyPassword).toContainText(validationMessage);
    }

    async validateLoginForRandomUser(validationMessage) {
        await expect(this.randomUser).toContainText(validationMessage);
    }

    async validateUnauthorizedAccessForAPI(saucedemoAPI, validationMessage) {
        await this.page.goto(this.baseURL + saucedemoAPI);
        await expect(this.apiError).toContainText(validationMessage);
    }
}

module.exports = { LoginPage };
