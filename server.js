const mysql = require('mysql2');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database:'tracker_db'
    },
    console.log('Connected to the tracker_db database')
);

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
    options();
  })
};

function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    err ? console.err(err) : console.table(results)
    options();
  })
};

function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    err ? console.err(err) : console.table(results)
    options();
  })
};

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What department would you like to add?',
        name: 'addDepartment'
      }
    ])
    .then((answers) => {
      db.query('INSERT INTO department(name) VALUES = ?', (answers.addDepartment), function (err, results) {
        err ? console.err(err) : console.table(results)
        options();
      })
    })
};

function addRole() {
  const department = () => db.promise().query('SELECT * FROM department')
    .then((rows) => {
        let departmentNames = rows[0].map(obj => obj.departmentNames);
        return departmentNames;
  })
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What role would you like to add?',
        name: 'addRole'
      },
      {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'addRoleSalary'
      },
      {
        type: 'list',
        message: 'What department does this role belong to?',
        name: 'addRoleDepartment',
        choices: department
      }
    ])
    .then((answers) => {
      db.promise().query('INSERT INTO role(title) VALUES = ?, ?, ?', (answers.addRole, answers.addRoleSalary, answers.addRoleDepartment), function (err, results) {
        err ? console.err(err) : console.table(results)
        options();
      })
    })
};

function addEmployee() {
  const role = () => db.promise().query('SELECT * FROM role')
    .then((rows) => {
        let roleNames = rows[0].map(obj => obj.roleNames);
        return roleNames;
  })
  const employee = () => db.promise().query('SELECT * FROM employee')
    .then((rows) => {
        let employeeNames = rows[0].map(obj => obj.employeeNames);
        return employeeNames;
  })
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the FIRST NAME of the employee you want to add?',
        name: 'addEmployeeFirstName'
      },
      {
        type: 'input',
        message: 'What is the LAST NAME of the employee you want to add?',
        name: 'addEmployeeLastName'
      },
      {
        type: 'list',
        message: `What is this employee's role?`,
        name: 'addEmployeeRole',
        choices: role
      },
      {
        type: list,
        message: 'Who is the manager of this employee?',
        name: 'addEmployeeManager',
        choices: employee
      }
    ])
    .then((answers) => {
      db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES = ?, ?, ?, ?', (answers.addEmployeeFirstName, answers.addEmployeeLastName, answers.addEmployeeRole, answers.addEmployeeManager), function (err, results) {
        err ? console.err(err) : console.table(results)
        options();
      })
    })
}
