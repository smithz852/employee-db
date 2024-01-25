INSERT INTO departments (department_name)
VALUES ("HR"),
       ("Sales"),
       ("Marketing"),
       ("IT"),
       ("Accounting");

INSERT INTO roles (id, title, salary, department_id)
VALUES (100, "Manager", 80000, 2),
       (103, "Tech", 85000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Zach", "Smith", 100, 501),
       (002, "Jane", "Doe", 103, 505);

