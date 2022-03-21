const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();

//Connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    }
);

// Possible commands to load into prompts
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
    ORDER BY employee_id`;

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

    db.query(queryShowAllRoles, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.table(data);
            choicePrompt();
        }
    });
};

viewAllEmployees = () => {

    db.query(queryShowAllEmployees, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.table(data);
            choicePrompt();
        }
    });
};

addDepartment = () => {
    db.query(queryShowAllDepartments, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.table(data);
            return inquirer.prompt(
                {
                    name: "department",
                    type: "input",
                    message: "Enter the name of the new department to add"
                }
            ).then(answer => {
                let newDepartment = answer.department;
                let sql = `
                    INSERT INTO department (name)
                    VALUES ("${newDepartment}")`

                db.query(sql, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        choicePrompt();
                    }
                })
            });
        }
    });
};

addRole = () => {

    db.query(queryShowAllRoles, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {

            console.table(data);
            return inquirer.prompt(
                [
                    {
                        name: "title",
                        type: "input",
                        message: "Enter the title of the new role to add"
                    },
                    {
                        name: "salary",
                        type: "number",
                        message: "Enter the annual salary the new role pays"
                    },
                    {
                        name: "department_id",
                        type: "list",
                        message: "Enter the department ID the new role belongs to",
                        choices: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                        // Need to make this pull the actual departments soon
                    }
                ]

                ).then(answer => {

                const {title, salary, department_id} = answer;
                let sql = `
                    INSERT INTO role (title, salary, department_id)
                    VALUES ("${title}", "${salary}", "${department_id}")`

                db.query(sql, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        choicePrompt();
                    }
                })
            });
        }
    });
};

addEmployee = () => {

    db.query(queryShowAllEmployees, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.table(data);
            return inquirer.prompt(
                [
                    {
                        name: "first_name",
                        type: "input",
                        message: "Enter the employee's first name"
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "Enter the employee's last name"
                    },
                    {
                        name: "role_id",
                        type: "list",
                        message: "Enter the role ID the new employee belongs to",
                        choices: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                        // Need to make this pull the actual ID soon
                    },
                    {
                        name: "manager_id",
                        type: "list",
                        message: "Enter the ID of the new employee's manager",
                        choices: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                        // Need to make this pull the actual ID soon
                    }
                ]

                ).then(answer => {

                const {first_name, last_name, role_id, manager_id} = answer;
                let sql = `
                    INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES ("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`;

                db.query(sql, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        choicePrompt();
                    }
                })
            });
        }
    });
};


updateRole = () => {

    db.query(`SELECT first_name, last_name, id FROM employee ORDER BY first_name`, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.table(data);
            
            // Push each employee to a new array of just their IDs and role_IDs
            let employees = [];
            for (let i = 0; i < data.length; i++) {
                employees.push(data[i].id);
            }

            return inquirer.prompt(
                [
                    {
                        name: "id",
                        type: "list",
                        message: "Enter the employee whose role will be updated",
                        choices: employees
                    },
                    {
                        name: "role_id",
                        type: "list",
                        message: "Select the role ID to update the employee with",
                        choices: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                    }
                ]

                ).then(answer => {

                const {id, role_id} = answer;

                let sql = `
                    UPDATE employee
                    SET role_id = ${role_id}
                    WHERE id = ${id}`;

                db.query(sql, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        choicePrompt();
                    }
                })
            });
        }
    });

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
            viewAllDepartments();
        }
        else if (answer.choice === "View All Roles") {
            viewAllRoles();
        }
        else if (answer.choice === "View All Employees") {
            viewAllEmployees();
        }
        else if (answer.choice === "Add a Department") {
            addDepartment();
        }
        else if (answer.choice === "Add a Role") {
            addRole();
        }
        else if (answer.choice === "Add an Employee") {
            addEmployee();
        }
        else if (answer.choice === "Update an Employee's Role") {
            updateRole();
        }
    });
};


// Call the prompts in order
choicePrompt()