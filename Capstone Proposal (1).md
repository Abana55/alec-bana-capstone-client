# Project Title

dive deeper property value estimations based on zip code or something like that to people know if their home purchase is a good investemtn 

auto one depreciation value for car models

## Overview

What is your app? Brief description in a couple of sentences.
my App is Summa, a loan caluator designed to help people better understand s debt and the way it xan impact their future. Summa will be a single source for a user to be able to see what kinds of loans are out there and what they can expect to pay by using an interactive input system. 

### Problem

Why is your app needed? Background information around any pain points or other reasons.

most people never understand what they are getting into when they decide to purchase a car, a home or even starting a business. my app is essential to every person who would be interested in purchasing an asset that would require debt, with my app people would be able to discern if the loan they are creating would be feasable for the user to get.

### User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account.

The Target audience i strive to reach would be people who are curious at getting into debt which could be anyone from the age of 18-65. they would be able to open the app and fill out some forms (products cost, debt amount, years to pay off, interest rate, how much they are willing to put down initially). after the inputs have beeen placed a monthly cost will populate as well as a grapgh to better help visualize the users debt to pay off rate would be. 

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

Loan Calculation:

As a user, I want to be able to enter the loan amount, interest rate, and loan term to calculate my monthly payment and total interest cost.

Save and Load Calculations:

As a user, I want the ability to save my loan calculations and load them later to review or edit.
Graphical Representation:

As a user, I want to see graphical representations, such as charts, of my loan amortization to better understand the payment schedule.
Amortization Schedule:

As a user, I want to generate an amortization schedule to see how my loan balance and payments change over time.
Loan Comparison:

As a user, I want to compare multiple loan options by inputting their details and viewing the differences in terms of monthly payments and overall costs.
Interest Rate Options:

As a user, I want the option to choose between fixed and variable interest rates to see how they affect my loan terms.

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.
Express.js, JavaScript, React, HTML and CSS, MySQL, Chart.js or D3.js

### APIs

List any external sources of data that will be used in your app.

Historical Data: using a market data api to pull current home prices
Interest Rate Data: Financial institutions or government sources: To fetch current interest rates for different types of loans ( mortgages, personal loans, auto loans).



### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

Login/Registration: Allows new users to register an account and existing users to log in, providing access to personalized features and saved calculations.

Home Page: The landing page that provides an overview of the app's features and benefits. Users can navigate to other sections from here.

Loan Calculator: The core feature of the app, allowing users to input loan details and receive calculated results, including monthly payments and amortization schedules.

Saved Calculations: Users can view, edit, and manage their previously saved loan calculations, facilitating easy access to past data. aswell as redirect you to generate a new loan. 

        lognpage=>homepage=>loanCalculator=>informationDisplayed=>savedLoans

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 

Each User Data entry has a one-to-many relationship with Saved Calculations, as a user can have multiple saved calculations.
User Data also has a one-to-many relationship with Loan Data, as users can create and manage multiple loans.
Saved Calculations and Loan Data are related to enable users to save and retrieve specific calculations associated with their loans.
Calculated results (such as monthly payments and amortization schedules) are not typically stored in a database but generated on-the-fly based on user input.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.
User Registration

HTTP Method: POST
Parameters:
username (string)
email (string)
password (string)
Example Response:
Successful Registration: {"message": "Registration successful."}
Error: {"error": "Username already exists."}
User Login

HTTP Method: POST
Parameters:
username (string)
password (string)
Example Response:
Successful Login: {"message": "Login successful.", "token": "example_token"}
Error: {"error": "Invalid credentials."}
User Profile

HTTP Method: GET
Parameters: None
Example Response:
Successful Profile Retrieval:
    {
    "username": "example_user",
    "email": "example@email.com",
    "saved_calculations": [
        {
            "calculation_id": 1,
            "loan_name": "Mortgage",
            "loan_amount": 200000,
            "interest_rate": 4.5,
            "loan_term": 30,
            "monthly_payment": 1013.37
        }
    ]
}

Loan Calculation

HTTP Method: POST
Parameters:
loan_amount (number)
interest_rate (number)
loan_term (number)
Example Response:
Successful Calculation:
    {
    "loan_amount": 200000,
    "interest_rate": 4.5,
    "loan_term": 30,
    "monthly_payment": 1013.37,
    "amortization_schedule": [
        {
            "payment_number": 1,
            "payment_date": "2023-11-01",
            "payment_amount": 1013.37,
            "principal_payment": 265.66,
            "interest_payment": 747.71,
            "remaining_balance": 199734.34
        },
        {...}
    ]
}
Save Calculation

HTTP Method: POST
Parameters:
loan_name (string)
loan_amount (number)
interest_rate (number)
loan_term (number)
Example Response:
Successful Save: {"message": "Calculation saved."}
Error: {"error": "Unable to save calculation."}
Get Saved Calculations

HTTP Method: GET
Parameters: None
Example Response:
Successful Retrieval:
    {
    "saved_calculations": [
        {
            "calculation_id": 1,
            "loan_name": "Mortgage",
            "loan_amount": 200000,
            "interest_rate": 4.5,
            "loan_term": 30,
            "monthly_payment": 1013.37
        },
        {...}
    ]
}


### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

User Registration: During user registration, store the user's username and password directly in the database without hashing.

User Login: When a user attempts to log in, retrieve the stored password from the database based on the provided username.
Compare the entered password with the stored password.
Password Comparison:

If the entered password matches the stored password, allow the user to log in.
If the passwords do not match, deny access and inform the user that the login attempt failed.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.
Sprint Duration: November 13th to November 30th (18 days)

Sprint Planning Meeting (November 13th):

Backlog Refinement (0.5 day)

Review and prioritize the backlog.
Define the user stories and their acceptance criteria.
Sprint Goal Definition (0.5 day)

Define the sprint goal, which could be something like: "Create a functional loan calculator app with basic registration and login."
Week 1: November 13th - November 19th (7 days)

Sprint Execution (5 days):
Hold daily stand-up meetings to track progress and resolve any blockers.

User Story 1: User Registration (2 days)

Task 1: Implement the registration form and user interface.
Task 2: Implement user registration logic without password hashing.
Task 3: Create unit tests for the registration process.
User Story 2: Loan Calculation Form (2 days)

Task 1: Develop the loan calculation form with the necessary input fields.
Task 2: Implement the loan calculation logic on the front-end.
Task 3: Create unit tests for the loan calculation.
User Story 3: Basic Database Setup (1 day)

Task 1: Set up an in-memory database to store user data.
Task 2: Create a schema for user data.
Week 2: November 20th - November 26th (7 days)

Sprint Execution (5 days):
Continue with daily stand-up meetings for tracking and adjustments.

User Story 4: User Authentication (3 days)

Task 1: Enhance the registration process with password hashing (Argon2 or similar).
Task 2: Implement user login functionality with basic security.
Task 3: Create unit tests for authentication.
User Story 5: Loan Calculation Logic (2 days)

Task 1: Implement the loan calculation logic on the back-end.
Task 2: Create API endpoints for loan calculation and amortization schedule generation.
Week 3: November 27th - November 30th (4 days)

Sprint Execution (3 days):

Daily stand-up meetings continue for tracking progress and making any final adjustments.

User Story 6: Testing, Documentation, and Deployment (3 days)

Task 1: Thoroughly test the application for usability, functionality, and security.
Task 2: Debug and fix any issues or errors.
Task 3: Prepare user documentation and provide information on how to use the app.
Task 4: Deploy the application to a hosting platform (e.g., Heroku, AWS).
Sprint Review and Retrospective (November 30th):

Review the completed user stories and demonstrate the functioning app.
Discuss what went well and what could be improved in the next sprint.

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

Currency Conversion:
Add a feature to convert loan amounts and results into different currencies.
Utilize external currency exchange rate APIs for real-time conversion.

Advanced Loan Options:
Add advanced loan options like variable interest rates, balloon payments, or refinancing.

Advanced Amortization Features:
Enhance the amortization schedule with features like extra payments, one-time lump sums, or dynamic interest rate changes

CPI Inflation Calculator:
Create a dedicated section in the app's user interface for the CPI Inflation Calculator.
Allow users to enter the following information:
Initial year of the purchase.
Initial cost of the item.
Target year for comparison (usually the current year).
Provide a "Calculate" button to initiate the inflation calculation.