const mysql = require('mysql2');
const index = require('./index');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: '9227',
      database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
  );

function dbReader(data) {
    let option = data.database;
    if (option === 'View All Departments') {
       viewAllDepts();
    } else if (option === 'View All Roles') {
        viewAllRoles();
    } else if (option === 'View All Employees') {
        viewAllEmployees();
    } else if (option === 'Add a Department') {
        addDepartment();
    }
}

function viewAllDepts() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.log(results);
        index.runDatabase();
    })
}

function viewAllRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.log(results);
        index.runDatabase();
    })
}

function viewAllEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        console.log(results);
        index.runDatabase();
    })
}

function addDepartment() {
        inquirer
         .prompt([
            {
                type: 'input',
                message: 'Please input a department name:',
                name: 'department',
                validate: function listValidation(input) {
                    if (input == '') {
                        return false;
                    } else {
                        return true;
                    }
                },
            },
         ]).then((data) => {
            let newDept = data.department;
            console.log('new dept', newDept)
            db.query('INSERT INTO departments (department_name) VALUES (?);', newDept, function (err, results) {
                console.log(results);
                index.runDatabase();
            })
         });      
}

// console.log('input: ', option)
//         console.log('nope');
//         return;

module.exports = dbReader;