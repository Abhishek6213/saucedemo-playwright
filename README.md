# Automation of saucedemo using Playwright

This project uses [Playwright](https://playwright.dev/) to Automate [SauceDemo](https://www.saucedemo.com/). <br/>
It contains automation of 5 major test scenarios of the Application

# Overview

Follow below steps to run the project in your local :

1. Open a new terminal and clone the main project by using the following command
   <br/> `git clone https://github.com/Abhishek6213/saucedemo-playwright.git`
   
2. Install [node.js](https://nodejs.org/en/) to run the tests in the local system

3. Navigate to the saucedemo project using - `cd saucedemo-playwright`

4. Install Playwright using the command - `npm install -D @playwright/test`

5. Execute tests using the command - `npx playwright test`


# Various configurations to run the Playwright tests for saucedemo <br/>

<h3> To Execute the tests in One/Multiple browsers </h3> 

In [playwright.config.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/playwright.config.js), in the 'projects' array Add/Remove the browser objects and configure them to run in headless or UI mode as per need. <br/>
Default - Project is configured to run on 3 browsers - Chrome, Firefox, Safari in UI mode

<h3> To Execute the tests for various users </h3> 

In [LoginTestData.json](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/utils/LoginTestData.json), use different users for which we want to run all the tests. <br/>
Default - Project is configured to run all the test classes( CartScenarios, CheckoutScenarios, InventoryScenarios, MenuScenarios) for 3 users - standard_user, problem_user, performance_glitch_user <br/>
LoginScenarios is configured to run for all User combinations.

# Test Scenarios covered

1. <b> Login Scenarios </b> - Here the test cases covered are - Login with various users like - standard_user, problem_user, performance_glitch_user,problem_user, empty user name/password, Validate api error messages when unauthorized users try to login various APIs etc. [LoginScenarios.spec.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/tests/LoginScenarios.spec.js)

2. <b> Inventory Scenarios </b> - Here the test cases covered are - Number of Items present in Inventory, Add/Remove items from Cart, Sorting, Add/Remove items from Inventory item Detail page, BACK TO PRODUCTS etc. [InventoryScenarios.spec.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/tests/InventoryScenarios.spec.js)

3. <b> Cart Scenarios </b> - Here the test cases covered are - CONTINUE SHOPPING on Cart, REMOVE item from Cart, Checkout, Visibility of Checkout for Empty cart etc. [CartScenarios.spec.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/tests/CartScenarios.spec.js)

4. <b> Checkout Scenarios </b> - Here the test cases covered are - CANCEL on checkout step one/checkout step two page, Error message for personal info missing, items and their cost on checkout step two page, end to end complete checkout process etc. [CheckoutScenarios.spec.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/tests/CheckoutScenarios.spec.js)

5. <b> Menu RESET Scenarios </b> - Here the test cases covered are - Login->Add Items to Cart->Logout->Login, RESET App state, ABOUT etc at Menu Page. [MenuResetScenarios.spec.js](https://github.com/Abhishek6213/saucedemo-playwright/blob/main/tests/MenuResetScenarios.spec.js)


# Test Results / Reporting 

1. To generate 'HTML' Reports, run - 'npx playwright test'. This will generate HTML Rports, which will automatically open in local browser in case of any failures, while if all the test cases pass, it can be opened in browser with the command - 'npx-playwright-report'.

  <b> HTML Report for Login Scenario </b>

  <img width="851" alt="SauceDemo_Login" src="https://user-images.githubusercontent.com/17552876/170852765-1d16817e-b814-44dd-ba66-3747b2857c4a.png">

  Other HTML reports are in [html-reports](https://github.com/Abhishek6213/saucedemo-playwright/tree/main/html-reports). You can clone the repository and   open these in a browser to get insight of test results.

2. To generate 'Allure' Reports, run following commands: <br/> 

         a. npx playwright test --reporter=line,allure-playwright <br/>

         b. allure generate allure-results --clean -o allure-report <br/>

         c. allure open ./allure-report <br/>
         
  <b> Allure Report for Standard User </b>
 
 
   <img width="1779" alt="StandardUser_saucedemo" src="https://user-images.githubusercontent.com/17552876/170852531-364dda21-4285-4a2b-ac58-046abdd18dd1.png">


  <b> Allure Report for Problem User </b>


   <img width="1782" alt="ProblemUser_saucedemo" src="https://user-images.githubusercontent.com/17552876/170852544-fca45c47-5680-49da-afdd-a84923029200.png">

   
                                                                       


