const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { listenerCount } = require('mysql2/typings/mysql/lib/Connection');

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
function options() {
  inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menuInput',
            choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add a department',
              'Add a role',
              'Add an employee',
              'Update an employee role', 
              'Quit'
            ]
        }
    ])
    .then((answers) => {
      if (menuInput === 'View all departments') {
        viewDepartments();
      }
      else if (menuInput === 'View all roles') {
        viewRoles();
      }
      else if (menuInput === 'View all employees') {
        viewEmployees();
      }
      else if (menuInput === 'Add a department') {
        addDepartment();
      }
      else if (menuInput === 'Add a role') {
        addRole();
      }
      else if (menuInput === 'Add an employee') {
        addEmployee();
      }
      else if (menuInput === 'Update an employee role') {
        updateEmployeeRole();
      }
    })
};

options();

// Queries
function viewDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    err ? console.err(err) : console.table(results) 
  })
  options();
};

function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    err ? console.err(err) : console.table(results)
  })
  options();
};

function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    err ? console.err(err) : console.table(results)
  })
  options();
};

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What department would you like to add?',
        name: addDepartment
      }
    ])
    .then((answers) => {
      db.query('INSERT INTO department(name) VALUES = ?', (answers.addDepartment), function (err, results) {
        err ? console.err(err) : console.table(results)
      })
    })
    options();
};

function addRole() {
  inquirer
    .prompt([
      {
        type: 'choices',
        message: 'What role would you like to add?',
        name: addRole,
        choices: [
          'Sales Lead',
          'Salesperson',
          'Trainer',
          'HR Compliance',
          'Lawyer',
          'Paralegal',
          'Senior Engineer',
          'Software Engineer'
        ]
      }
    ])
    .then((answers) => {
      db.query('INSERT INTO role(title) VALUES = ?', (answers.addRole), function (err, results) {
        err ? console.err(err) : console.table(results)
      })
    })
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the salary of the role?',
        name: addRoleSalary
      }
    ])
    .then((answers) => {
      db.query('INSERT INTO role(salary) VALUES = ?', (answers.addRoleSalary), function (err, results) {
        err ? console.err(err) : console.table(results)
      })
    })
  inquirer
    .prompt([
      {
        type: list,
        message: 'What department does the role belong to?',
        name: addRoleDepartment,
        choices: [
          'Sales',
          'Human Resources',
          'Legal',
          'Engineering'
        ]
      }
    ])
    .then((answers) => {
      db.query('INSERT INTO department_id VALUES = ?', (answers.addRoleDepartment), function (err, results) {
        err ? console.err(err) : console.table(results)
      })
    })
    options();
};

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the FIRST NAME of the employee you want to add?',
        name: addEmployeeFirtName
      }
    ])
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the LAST NAME of the employee you want to add?',
        name: addEmployeeLastName
      }
    ])
    .then((answers) => {
      db.query('INSERT INTO employee(first_name) VALUES = ?', (answers.addEmployeeFirstName), function (err, results) {
        err ? console.err(err) : console.table(results)
      })
    })
    .then((answers) => {
      db.query('INSERT INTO employee(last_name) VALUES = ?', (answers.addEmployeeLastName), function (err, results) {
        err ? console.err(err) : console.table(results)
      })
    })
  inquirer
    .prompt([
      {
        type: 'What is the employees role?',
        name: addEmployeeRole,
        choices: [
          'Sales',
          'Human Resources',
          'Legal',
          'Engineering'
        ]
      }
    ])
    .then((answers) => {
      db.query('INSERT INTO employee(role_id) VALUES = ?', (answers.addEmployeeRole), function (err, results) {
        err ? console.err(err) : console.table(results)
      })
    })
  inquirer
    .prompt([
      {
        type: `Who is the employee's manager?`,
        name: addEmployeeManager,
        choices: [
          'Kenny Singh',
          'Janice Golden',
          'Barrett Cannon',
          'Grant Morgan',
          'Debbie Becker',
          'Emanuel Suarez',
          'Taylor Raymond',
          'Marissa Peters'
        ]
      }
    ])
    options();
}

function updateEmployeeRole() {

}


