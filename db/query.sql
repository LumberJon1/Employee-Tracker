
-- GET ALL DEPARTMENTS
-- SELECT id AS department_id, name AS department_title
-- FROM department;

-- GET ALL ROLES
-- job title, role id, department name, salary
-- SELECT role.title AS role_title, role.id AS role_id, department.name AS department, role.salary
-- FROM role
-- LEFT JOIN department ON role.department_id=department.id;

-- GET ALL EMPLOYEES
-- SELECT 
--     employee.id AS employee_id,
--     employee.first_name, employee.last_name,
--     employee.manager_id AS manager_id,
--     role.title AS job_title,
--     department.name AS department,
--     role.salary
-- FROM employee
-- LEFT JOIN role ON employee.role_id=role.id
-- LEFT JOIN department ON role.department_id=department.id
-- ORDER BY job_title;

-- ADD A DEPARTMENT
-- INSERT INTO department (name)
-- VALUES ("User Input");

-- ADD A ROLE
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("User Input", "User Input", "User Input");

-- ADD AN EMPLOYEE
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("User Input", "User Input", "User Input", "User Input");

-- UPDATE AN EMPLOYEE ROLE
-- UPDATE employee
-- SET role_id = user-input
-- WHERE id = user-input;
