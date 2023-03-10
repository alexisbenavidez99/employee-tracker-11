# Employee Tracker

## Description
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A MySQL back-end application that tracks employee's roles, salaries, and managers. It also tracks departments within the company and you are able to update a employee's role.

## Built With
- MySQL
- Inquirer
- console.table

## Installation
- Clone repo down to your local machine
- In server.js file, change the password in createConnection to you MySQL password
- Open intergrated terminal and install `inquirer`, `mysql2` and `console.table`.
- Run `node server.js`

## Usage
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Preview
[Employee-Tracker-Demo.webm](https://user-images.githubusercontent.com/113260005/212796034-807c4a02-a64f-471e-9ab4-9dfb15f2b724.webm)

## License
See license in repo