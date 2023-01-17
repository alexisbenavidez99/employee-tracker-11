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
      if (answers.menuInput === 'View all departments') {
        viewDepartments();
      }
      else if (answers.menuInput === 'View all roles') {
        viewRoles();
      }
      else if (answers.menuInput === 'View all employees') {
        viewEmployees();
      }
      else if (answers.menuInput === 'Add a department') {
        addDepartment();
      }
      else if (answers.menuInput === 'Add a role') {
        addRole();
      }
      else if (answers.menuInput === 'Add an employee') {
        addEmployee();
      }
      else if (answers.menuInput === 'Update an employee role') {
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
      db.query('INSERT INTO department(name) VALUES(?)', answers.addDepartment, function (err, results) {
        if (err) {
          console.log(err)
        } else {
          db.query('SELECT * FROM department', function (err, results) {
            err ? console.err(err) : console.table(results)
            options();
          })
        }
      })
    })
};

function addRole() {
  const department = () => db.promise().query('SELECT * FROM department')
    .then((rows) => {
        let departmentNames = rows[0].map(obj => ({
          name: obj.name,
          value: obj.id
        }));
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
      db.promise().query('INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)', [answers.addRole, answers.addRoleSalary, answers.addRoleDepartment])
      .then(function (results) {
          db.query('SELECT * FROM department', function (err, results) {
            err ? console.err(err) : console.table(results)
            options();
          })
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      })
    })
};

function addEmployee() {
  const role = () => db.promise().query('SELECT * FROM role')
    .then((rows) => {
        let roleNames = rows[0].map(obj => ({
          name: obj.title,
          value: obj.id
        }));
        return roleNames;
  })
  const employee = () => db.promise().query('SELECT * FROM employee')
    .then((rows) => {
        let employeeNames = rows[0].map(obj => ({
          name: `${obj.first_name} ` + `${obj.last_name}`,
          value: obj.id
        }));
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
        type: 'list',
        message: 'Who is the manager of this employee?',
        name: 'addEmployeeManager',
        choices: employee
      }
    ])
    .then((answers) => {
      db.promise().query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)', [answers.addEmployeeFirstName, answers.addEmployeeLastName, answers.addEmployeeRole, answers.addEmployeeManager])
      .then(function (results) {
          db.query('SELECT * FROM employee', function (err, results) {
            err ? console.err(err) : console.table(results)
            options();
          })
      })
      .catch(err => {
        if (err) {
          console.log(err)
        }
      })
    })
}

function updateEmployeeRole() {
  const employee = () => db.promise().query('SELECT * FROM employee')
    .then((rows) => {
        let employeeNames = rows[0].map(
          ({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
          })
        );
        return employeeNames;
  })
  const role = () => db.promise().query('SELECT * FROM role')
    .then((rows) => {
        let roleNames = rows[0].map(obj => obj.title);
        return roleNames;
  })
  inquirer
    .prompt([
      {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        name: 'updateEmployeeName',
        choices: employee
      },
      {
        type: 'list',
        message: 'What role do you want to assign to the selected employee?',
        name: 'updateEmployeeRole',
        choices: role
      }
    ])
    .then((answers) => {
      db.promise().query('SELECT id FROM role WHERE title = ?', answers.updateEmployeeRole)
      .then(answers => {
        let foundId = answers[0].map(obj => obj.id);
        return foundId[0];
      })
      .then((foundId) => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [foundId, answers.updateEmployeeName])
      })
      .then(function (results) {
        db.query('SELECT * FROM employee', function (err, results) {
          err ? console.err(err) : console.table(results)
          options();
        })
    })
      .catch(err => {
        if (err) {
          console.log(err)
        }
      })
    })
}
