const mysql = require("mysql2");
const index = require("./index");
const inquirer = require("inquirer");
const { elementAt } = require("rxjs");

let roleArray = [];
let managerArray = [];
let deptArray = [];

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "9227",
    database: "employee_db",
  },
  console.log(`Connected to the employee database.`)
);

function dbReader(data) {
  let option = data.database;
  if (option === "View All Departments") {
    viewAllDepts();
  } else if (option === "View All Roles") {
    viewAllRoles();
  } else if (option === "View All Employees") {
    viewAllEmployees();
  } else if (option === "Add a Department") {
    addDepartment();
  } else if (option === "Add a Role") {
    createArray();
  } else if (option === "Add an Employee") {
    createEmployeeArray();
    createManagerArray();
  }
}

function viewAllDepts() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
    index.runDatabase();
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
    index.runDatabase();
  });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
    console.table(results);
    index.runDatabase();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please input a department name:",
        name: "department",
        validate: function listValidation(input) {
          if (input == "") {
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((data) => {
      let newDept = data.department;
      console.log("new dept", newDept);
      db.query(
        "INSERT INTO departments (department_name) VALUES (?);",
        newDept,
        function (err, results) {
          console.log(results);
          index.runDatabase();
        }
      );
    });
}

function createArray() {
  db.query("SELECT department_name FROM departments;", function (err, results) {
    results.forEach((element) => deptArray.push(element.department_name))
    addRole();
  });
}

function createEmployeeArray() {
  db.query("SELECT title FROM roles;", function (err, results) {
    results.forEach((element) => roleArray.push(element.title));
  });
}

function createManagerArray() {
  db.query(`SELECT id, CONCAT(first_name, " ", last_name) AS manager_name FROM employees ;`, function (err, results) {
    console.log(results);
    results.forEach((element) => managerArray.push({name: element.manager_name, value: element.id}));
    console.log(managerArray);
    addEmployee();
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of this role?",
        name: "roleName",
        validate: function listValidation(input) {
          if (input == "") {
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary",
        validate: function listValidation(input) {
          if (input == "") {
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "list",
        message: "Please choose a department:",
        choices: deptArray,
        name: "roleDept",
        validate: function listValidation(input) {
          if (input == "") {
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((data) => {
      let newRole = data.roleName;
      let salary = data.salary;
      let roleDept = data.roleDept;
      let generalArray = [];
      let idArray = [];

      db.query(
        "SELECT id FROM departments WHERE department_name = ?;",
        roleDept,
        function (err, results) {
          // console.log('Result', results);
          results.forEach((element) =>
            generalArray.push(Object.values(element))
          );
          console.log("array", generalArray[0]);
          idArray.push(generalArray[0][0]);
          console.log("id", idArray);

          console.log("Role Info: ", newRole, salary, idArray[0]);
          db.query(
            "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);",
            [newRole, salary, idArray[0]],
            function (err, results) {
              console.log(results);
              index.runDatabase();
            }
          );
        }
      );
    });
    deptArray = [];
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employees' first name?",
        name: "firstName",
        validate: function listValidation(input) {
          if (input == "") {
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        message: "What is the employees' last name?",
        name: "lastName",
        validate: function listValidation(input) {
          if (input == "") {
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "list",
        message: "Please choose a role:",
        choices: roleArray,
        name: "roles",
        validate: function listValidation(input) {
          if (input == "") {
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "list",
        message: "Who is the manager?",
        choices: managerArray,
        name: "manager",
        validate: function listValidation(input) {
          if (input == "") {
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((data) => {
      let firstName = data.firstName;
      let lastName = data.lastName;
      let roles = data.roles;
      let manager = data.manager;
      let generalArray = [];
      let managerListArray = [];
      let rolesArray = [];
      let managersArray = [];

    

      db.query(
        "SELECT id FROM roles WHERE title = ?;",
        roles,
        function (err, results) {
          console.log("Roles", results);
          results.forEach((element) =>
            generalArray.push(Object.values(element))
          );
          console.log("R array", generalArray[0]);
          rolesArray.push(generalArray[0][0]);
          console.log("R id", rolesArray);

          console.log(
            "confirmation: ",
            firstName,
            lastName,
            rolesArray[0],
            managersArray[0]
          );
          db.query(
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
            [firstName, lastName, rolesArray[0], manager],
            function (err, results) {
              console.log("final result", results);
              index.runDatabase();
            }
          );
        }
      );
    });
    managerArray = [];
    roleArray = [];
}

module.exports = dbReader;
