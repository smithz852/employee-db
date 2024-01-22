const mysql = require('mysql2');
const index = require('./index')

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
            index.runDatabase();
          });
    } else {
        console.log('input: ', option)
        console.log('nope');
        return;
    }
}

module.exports = dbReader;