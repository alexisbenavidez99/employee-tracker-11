const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database:'tracker_db'
    },
    console.log('Connected to the tracker_db database')
)

// Inquirer Questions
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'intro',
            choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add a department',
              'Add a role',
              'Add an employee',
              'Update an employee role',  
            ]
        }
    ])
