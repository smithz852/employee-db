const mysql = require('mysql2');
const index = require('./index');
const inquirer = require("inquirer");
const fs = require('fs');

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
        db.query('SELECT * FROM departments', function (err, results) {
            console.log(results);
            runDatabase();
          });
    } else {
        console.log('input: ', option)
        console.log('nope');
        return;
    }
}

const runDatabase = () => {
    inquirer
     .prompt([
        {
            type: 'list',
            message: 'Please select an option:',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
            name: 'database',
            validate: function listValidation(input) {
                if (input == '') {
                    return false;
                } else {
                    return true;
                }
            },
        },
     ]).then((data) =>
     fs.readFile('./dbReader.js', dbReader(data), (err, data) => {
        if (err) throw err;
        console.log(data);
      }))
    }
    


exports.runDatabase = runDatabase;