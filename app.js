// Import our dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require('console.table');
// Create/configure our MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Toomey6307!",
    database: "employee_tracking_DB"
});

// Connect to the MySQL server, and call `mainPrompt()` when connected
connection.connect(err => {
    if (err) {
        throw err;
    }
    mainPrompt();
});

// main entry point of the program once the database connection is estalbished 
function mainPrompt() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add a department",
            "Add a role",
            "Add a employee",
            "View departments",
            "View roles",
            "View employees",
            "Update employee role",
            "Exit"
        ]
    }).then(onMainPromptAnswer);
}

function onMainPromptAnswer({ action }) {
    switch (action) {
        case "Add a department":
            addDepartment();
            break;

        case "Add a role":
            addRole();
            break;

        case "Add a employee":
            addEmployee();
            break;

        case "View departments":
            viewDepartments();
            break;

        case "View roles":
            viewRoles();
            break;

        case "View employees":
            viewEmployees();
            break;

        case "Update employee role":
            updateEmployeeRole();
            break;

        case "Exit":
        default:
            console.log("Goodbye!");
            connection.end();

    }


    // functions 

    function viewRoles() {
        const query = "Select * from role;"
        connection.query(query, (error, response) => {
            if (error) throw error;

            console.table(response);
            mainPrompt();
        });

    }

    function viewEmployees() {
        const query = `select first_name,last_name,UPPER(title) as Position_title, UPPER(name) as Department_name from employee
        inner join role on employee.role_id = role.id 
        inner join employee_tracking_DB.department on department.id = role.department_id;`
        connection.query(query, (error, response) => {
            if (error) throw error;

            console.table(response);
            mainPrompt();
        });

    }

    function viewDepartments() {
        const query = "Select * from department;"
        connection.query(query, (error, response) => {
            if (error) throw error;
            console.table(response);
            mainPrompt();
        });
    }

    function addDepartment() {

        inquirer.prompt([{
                name: "department_name",
                type: "input",
                message: "Please enter the department name"
            },
            {
                name: "department_number",
                type: 'input',
                message: 'enter department number'

            }
        ]).then(answers => {
            console.log(answers)

            const query = `INSERT INTO department (name, id) VALUES (?,?)`
            connection.query(query, [answers.department_name, answers.department_number], (error, response) => {
                if (error) throw error;
                console.table(response);
                mainPrompt();
            });

        });

    }

    function updateEmployeeRole() {
        const query = 'Select UPPER(title) from role;'
        const roles = [];
        connection.query(query, (error, response) => {
            if (error) throw error;
            console.log(response);
            // roles = roles.push(response);
            // console.log(roles);
        });



        inquirer.prompt([{
                name: "employee",
                type: "list",
                message: "Pick an employee",
                choices: ["stuff1", "stuff2"]
            },

        ]).then(answers => {
            console.log(answers)

            const query = `INSERT INTO department (name, id) VALUES (?,?)`
            connection.query(query, [answers.department_name, answers.department_number], (error, response) => {
                if (error) throw error;
                console.table(response);
                mainPrompt();
            });

        });


    }



}