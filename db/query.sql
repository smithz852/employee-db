SELECT 
employees.id AS id,
employees.first_name,
employees.last_name,
employees.role_id,
roles.salary,
departments.department_name,
employees.manager_id AS manager_id
FROM roles
INNER JOIN employees ON employees.id = roles.id
INNER JOIN departments ON roles.id = departments.id;

