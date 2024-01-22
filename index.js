const inquirer = require("inquirer");
const fs = require('fs');
const dbReader = require('./dbReader')

const runDatabase = () => {
inquirer
 .prompt([
    {
        type: 'checkbox',
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

runDatabase();

exports.runDatabase = runDatabase;