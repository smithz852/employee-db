DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

INSERT INTO departments (id, department_name)
VALUES (001, "HR"),
       (002, "Sales"),
       (003, "Marketing"),
       (004, "IT"),
       (005, "Accounting");