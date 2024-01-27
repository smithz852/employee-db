INSERT INTO departments (department_name)
VALUES ("HR"),
       ("Sales"),
       ("Marketing"),
       ("IT"),
       ("Accounting");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 80000, 2),
       ("Tech", 85000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Popeye ", "Flintstone", 001, NULL),
       (002, "Jane", "Doe", 002, 001);


