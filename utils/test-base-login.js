const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForLoginPage: {
        standardUsername: 'standard_user',
        problemUsername: 'problem_user',
        locketOutUsername: 'locked_out_user',
        performanceGlitchUsername: 'performance_glitch_user',
        emptyUsername: '',
        randomUsername: 'abc',
        password: 'secret_sauce',
        emptyPassword: '',
        randomPassword: 'abc',
        validationMessageForStanddardUser: 'Products',
        validationMessageForlocketOutUser: 'Epic sadface: Sorry, this user has been locked out.',
        validationMessageForProblemUser: 'Products',
        validationMessageForPerformanceGlitchUsername: 'Products',
        validationMessageForEmptyUsername: 'Epic sadface: Username is required',
        validationMessageForEmptyPassword: 'Epic sadface: Password is required',
        validationMessageForInvalidUserNamePassword: 'Epic sadface: Username and password do not match any user in this service',
        homePageTitle: 'Swag Labs',
        inventoryAPI: 'inventory.html',
        cartAPI: 'cart.html',
        checkoutOneAPI: 'checkout-step-one.html',
        checkoutTwoAPI: 'checkout-step-two.html',
        checkoutCompleteAPI: 'checkout-complete.html',
        inventoryAPIMessage: "Epic sadface: You can only access '/inventory.html' when you are logged in.",
        cartAPIMessage: "Epic sadface: You can only access '/cart.html' when you are logged in.",
        checkoutOneAPIMessage: "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.",
        checkoutTwoAPIMessage: "Epic sadface: You can only access '/checkout-step-two.html' when you are logged in.",
        checkoutCompleteAPIMessage: "Epic sadface: You can only access '/checkout-complete.html' when you are logged in.",
    },
});
