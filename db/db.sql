DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employees (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL
);

INSERT INTO departments (id, department_name)
VALUES (001, "HR"),
       (002, "Sales"),
       (003, "Marketing"),
       (004, "IT"),
       (005, "Accounting");

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Manager", 80000, 110),
       (002, "Tech", 85000, 111);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Zach", "Smith", 300, 501),
       (002, "John", "Dow", 302, 502),
       (003, "Jane", "Doe", 310, 505);