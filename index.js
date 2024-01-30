const inquirer = require("inquirer");
const fs = require('fs');
const dbReader = require('./dbReader')

const runDatabase = () => {
inquirer
 .prompt([
    {
        type: 'list',
        message: 'Please select an option:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit'],
        name: 'database',
        validate: function listValidation(input) {
            if (input == '') {
                return false;
            } else {
                return true;
            }
        },
    },
 ]).then((data) => {
    dbReader(data);
 });
}
 

function startDb() {
runDatabase();
}
startDb();

exports.runDatabase = runDatabase;
