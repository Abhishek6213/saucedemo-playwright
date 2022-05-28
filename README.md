# Automation of saucedemo using Playwright

We will be using [Playwright](https://playwright.dev/) to Automate [SauceDemo](https://www.saucedemo.com/). <br/>
This project [saucedemo](https://github.com/Abhishek6213/saucedemo-playwright) contains Automated test cases for the Application.

# Overview

Follow below steps to run the project in your local :

1. Open a new terminal and clone the main project by using the following command
   <br/> git clone https://github.com/Abhishek6213/saucedemo-playwright.git
   
2. Install [node.js](https://nodejs.org/en/) to run the tests in the local system.

3. Navigate to the saucedemo project using - cd saucedemo-playwright.

4. Install Playwright using the command - npm install -D @playwright/test

5. Execute tests using the command - npx playwright test


# Various configurations to run the Playwright tests for saucedemo <br/>

<h3> To Execute the tests in One/Multiple browsers </h3> 

In [playwright.config.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/playwright.config.js), in the 'projects' array Add/Remove the browser objects as per the need. <br/>
Default - Project is configured to run thr 3 browsers - Chrome, Firefox, Safari

<h3> To Execute the tests for various users </h3> 

In [LoginTestData.json](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/utils/LoginTestData.json), use different users for which we wan to run all the tests. <br/>
Default - Project is configured to run all the test classes( CartScenarios, CheckoutScenarios, InventoryScenarios, MenuScenarios) for 3 users - standard_user, problem_user, performance_glitch_user <br/>
LoginScenarios is configured to run for all User combinations.

# Test Scenarios covered - 

1. <b> Login Scenarios </b> - Here the test cases covered are - Login with various users like - standard_user, problem_user, performance_glitch_user,problem_user, empty user name/password, Validate api error messages when unauthorized users try to login various APIs etc. [LoginScenarios.spec.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/tests/LoginScenarios.spec.js)

2. <b> Inventory Scenarios </b> - Here the test cases covered are - Number of Items present in Inventory, Add/Remove items from Cart, Sorting, Add/Remove items from Inventory item Detail page, BACK TO PRODUCTS etc. [InventoryScenarios.spec.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/tests/InventoryScenarios.spec.js)

3. <b> Cart Scenarios </b> - Here the test cases covered are - CONTINUE SHOPPING on Cart, REMOVE item from Cart, Checkout, Visibility of Checkout for Empty cart etc. [CartScenarios.spec.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/tests/CartScenarios.spec.js)

4. <b> Checkout Scenarios </b> - Here the test cases covered are - CANCEL on checkout step one/checkout step two page, Error message for personl info missing, items and their cost on checkout step two page, end to end complete checkout process etc. [CheckoutScenarios.spec.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/tests/CheckoutScenarios.spec.js)

5. <b> Menu RESET Scenarios </b> - Here the test cases covered are - Login->Add Items to Cart->Logout->Login, RESET App state, ABOUT etc at Menu Page. [MenuResetScenarios.spec.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/tests/MenuResetScenarios.spec.js)






