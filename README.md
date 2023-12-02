# Resto-Bar Admin Dashboard

## Overview

This repository contains the code for a Resto-Bar Admin Dashboard with features like dynamic pricing, song request management, and visualization of data. The application uses the D3.js library to render a bar chart dynamically based on user input.

## Technologies Used

- React.js
- CSS
- D3.js

## Features

### 1. Song Request Configuration:

- **Charge Customers:** The value (true or false) is fetched from the "charge_customers" key in the API response. If set to "Yes," the following fields become editable; otherwise, they are greyed out.
  
- **Custom Song Request Amount:** The integer value is fetched from "category_6" in the response. It is a mandatory field if song requests are chargeable, with a minimum value of 99. The "Save" button is enabled only if the entered value is higher than 99; otherwise, it is greyed out.

- **Regular Song Request Amounts:** Values are fetched in descending order from "category_7," "category_8," "category_9," and "category_10" in the response. They are mandatory if song requests are chargeable, with minimum values of 79, 59, 39, and 19, respectively. The "Save" button is enabled only if all entered values are higher than the specified minimum values; otherwise, it is greyed out.

### 2. Graph:

- A dynamic bar chart that changes based on the values entered for custom and regular song request amounts. If song requests are not chargeable, the graph is removed.

## Styles

- Font Size: Headings - 32px, Others - 16px
- Font Family: Poppins
- Screen Background: #030303
- Font Colour: #FFFFFF
- Radio Button Background Colour: #FFFFFF
- Selected Radio Button Colour: #6741D9
- Text/Input Field Border: #FFFFFF
- Graph Bars Colour: #F0C3F1
- Bar Axis and Markings Colour: #FFFFFF
- Save Button Background: #6741D9
- Hover on Save Button: Border becomes active, #F0C3F1, 1px
- Click on Save Button: Border becomes active, #F0C3F1, 1px

## API Usage

### Screen 1:

- **(POST) Admin - Login:** Used when the "Sign in" button is clicked. Username: DJ@4, Password: Dhunjam@2023.

### Screen 2:

- **(GET) Admin – Details:** Used for getting screen 2 data. Save the ID from the successful login response to be used in this endpoint call.

- **(PUT) Admin - Price Update:** Used to save newly entered price amounts. After updating the price, call "(GET) Admin - Details" again to fetch the updated price for display on screen 2. If the "Save" button is greyed out, no API call is made.

## D3.js Library

This project utilizes the D3.js library for dynamic rendering of the bar chart in the Graph section.

## Instructions for Running the Application

1. Clone the repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Run the application with `npm start` or `yarn start`.

Feel free to explore the code and customize it according to your requirements!
