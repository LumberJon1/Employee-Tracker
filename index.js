const mysql = require("mysql2");
const inquirer = require("inquirer");
const table = require("console.table");
const fs = require("fs");

//Connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "#Handshake12117",
        database: "employees"
    }
);

// Possible commands to load into prompts
const queryShowAllTables = `SHOW TABLES`;
const queryShowAllDepartments = `
    SELECT id AS department_id, name AS department_title
    FROM department`;
const queryShowAllRoles = `
    SELECT role.title AS role_title, role.id AS role_id, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON role.department_id=department.id`;
const queryShowAllEmployees = `
    SELECT 
        employee.id AS employee_id,
        employee.first_name, employee.last_name,
        employee.manager_id AS manager_id,
        role.title AS job_title,
        department.name AS department,
        role.salary
    FROM employee
    LEFT JOIN role ON employee.role_id=role.id
    LEFT JOIN department ON role.department_id=department.id
    ORDER BY job_title`;
const queryAddDepartment = `
    INSERT INTO department (name)
    VALUES ("User Input")`;
const queryAddRole = `
    INSERT INTO role (title, salary, department_id)
    VALUES ("User Input", "User Input", "User Input")`;
const queryAddEmployee = `
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("User Input", "User Input", "User Input", "User Input")`;
const queryUpdateRole = `
    UPDATE employee
    SET role_id = user-input
    WHERE id = user-input`;

const queryTable = (sql) => {
    let dataArray = [];
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            for (let i = 0; i < data.length; i++) {
                console.log("data[i].Tables_in_employees: "+data[i].Tables_in_employees);
                dataArray.push(data[i].Tables_in_employees);
            };
        }
    })
    return dataArray;
}

// Table prompts
const viewAllDepartments = () => {

    db.query(queryShowAllDepartments, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.table(data);
            choicePrompt();
        }
    });
}

viewAllRoles = () => {

};

viewAllEmployees = () => {

};

addDepartment = () => {

};

addRole = () => {

};

addEmployee = () => {

};

updateRole = (employee) => {

};
                    

// Starting Inquirer prompt
const choicePrompt = () => {
    return inquirer.prompt(
        {
            name: "choice",
            message: "Select a command.",
            type: "list",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee's Role"
            ]
        }
    ).then(function(answer) {
        if (answer.choice === "View All Departments") {
            console.log("user chose to View All Departments");
            viewAllDepartments();
        }
        else if (answer.choice === "View All Roles") {
            console.log("User chose to view all roles.");
            viewAllRoles();
        }
        else if (answer.choice === "View All Employees") {
            console.log("User chose to view all employees.");
            viewAllEmployees();
        }
        else if (answer.choice === "Add a Department") {
            console.log("User chose to add a department.");
            addDepartment();
        }
        else if (answer.choice === "Add a Role") {
            console.log("User chose to add a new role.");
            addRole();
        }
        else if (answer.choice === "Add an Employee") {
            console.log("User chose to add a new employee.");
            addEmployee();
        }
        else if (answer.choice === "Update an Employee's Role") {
            console.log("User chose to update an employee's role.");
            updateRole(employee);
        }
    });
};


// Call the prompts in order
choicePrompt()