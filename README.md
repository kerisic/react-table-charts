# React table and charts
<img width="600" src="https://github.com/kerisic/react-table-charts/assets/71288920/20165090-cd9f-428b-95ca-7379359daa77">
<img width="600" src="https://github.com/kerisic/react-table-charts/assets/71288920/81d748a2-d4a9-4562-aa0a-6583e2047ccd">

## Description

This is a project to create a table and a set of charts for a mock dataset consisting of unique identifiers including id, name, DOB, salary, industry and years of experience. The dataset is saved within the public folder.

## How to run
1. Clone this repo.
3. Run `npm install` for dependencies.
4. Run `npm start` to run the app.
5. Navigate to `http://localhost:3000/`.

## How it works
* The table uses material react table which has useful in-build functionality including sorting, filtering and searching, pagination.
* The table however handles sorting manually for DOB, industry and annual income.
* It also supports editing and in a normal scenario would be hooked up to send updated values to the back-end. A simple example is included if we wanted to edit the last name of a person and save it locally.
* The charts uses react chartJs.
* Converted DOBs to age groups as I thought it would be interesting to see it visualised against salary ranges. Possibly no links as it's looking random?!
* The doughnut visualises proportion of people who work in each industry. In hindsight there are quite a few so some related ones could probably be combined, such as all the biotechnology sub categories into one.
* Clicking on each industry will display a bar chart of the salary of each person who works in that industry, with a tooltip displaying the age and years of experience.

