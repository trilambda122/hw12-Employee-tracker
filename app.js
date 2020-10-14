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
        const query = `select employee.id, first_name,last_name,UPPER(title) as Position_title, UPPER(name) as Department_name from employee
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

    function addRole() {
        inquirer.prompt([{
                name: "role_title",
                type: "input",
                message: "Please enter the role title"
            },
            {
                name: "role_salary",
                type: 'input',
                message: 'whats the starting salary for the role'

            },
            {
                name: "department_id",
                type: 'input',
                message: 'what department id does this belong to'

            },
            {
                name: "role_number",
                type: 'input',
                message: 'enter role number'

            }

        ]).then(answers => {
            console.log(answers)

            const query = `INSERT INTO role (title,salary,id,department_id) VALUES (?,?,?,?)`
            connection.query(query, [answers.role_title, answers.role_salary, answers.role_number, answers.department_id], (error, response) => {
                if (error) throw error;
                console.table(response);
                mainPrompt();
            });

        });
    }


    function addEmployee() {
        inquirer.prompt([{
                name: "employee_first_name",
                type: "input",
                message: "Please enter the employees first name"
            },
            {
                name: "employee_last_name",
                type: 'input',
                message: 'please enter the employees last name'

            },
            {
                name: "employee_role",
                type: 'input',
                message: 'Please enter the ID for the employees role'

            },
            {
                name: "manager_id",
                type: 'input',
                message: 'if employee has a managers please enter managers empployee id number'

            }

        ]).then(answers => {
            console.log(answers)

            const query = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`
            connection.query(query, [answers.employee_first_name, answers.employee_last_name, answers.employee_role, answers.manager_id], (error, response) => {
                if (error) throw error;
                console.table(response);
                mainPrompt();
            });

        });


    }

    function updateEmployeeRole() {
        console.log("");
        inquirer.prompt([{
                name: "employee_id",
                type: "input",
                message: "Please enter ID number for employee to update"
            },
            {
                name: "role_id",
                type: 'input',
                message: 'please enter the ID of the role you would like to assign the the employee '

            }

        ]).then(answers => {
            console.log(answers)

            const query = `UPDATE employee SET role_id=?  WHERE employee.id=?;`
            connection.query(query, [answers.role_id, answers.employee_id], (error, response) => {
                if (error) throw error;
                console.table(response);
                mainPrompt();
            });

        });
    }




    // would like to rewrite functions to be more dynamic. ie having the choices dynaimcly populated by SQL queries 

    // function updateEmployeeRole() {
    //     const employeeListSQL = `Select concat(UPPER(first_name)," " ,UPPER(last_name)) as name from employee;`

    //     let employees = [];


    //     connection.query(employeeListSQL, (error, response) => {
    //         if (error) throw error;
    //         response.forEach(item => {
    //             employees.push(item.name);


    //         });
    //         inquirer.prompt(
    //             [{
    //                     name: 'employee',
    //                     type: 'rawlist',
    //                     message: 'Please select employee: ',
    //                     choices: employees
    //                 },
    //                 {
    //                     name: 'roles',
    //                     type: "rawlist",
    //                     message: 'Please select new role',
    //                     choices: ['software tech 1',
    //                         'software tech 2',
    //                         'senior dev',
    //                         'field tech 1',
    //                         'field tech 2',
    //                         'accountant',
    //                         'controller',
    //                         'construction coordinator',
    //                         'construction manager',
    //                         'hr generalist',
    //                         'hr manager',
    //                         'ceo',
    //                         'cfo'
    //                     ]

    //                 }
    //             ]

    //         ).then(answers => {
    //             // console.log(answers);
    //             let employeeId;
    //             let roleId;
    //             // get employee id from selection 
    //             const getEmployeeIdSQL = `Select id from employee  where concat(UPPER(first_name)," " ,UPPER(last_name))=?;`
    //             connection.query(getEmployeeIdSQL, [answers.employee], (error, response) => {
    //                 if (error) throw error;

    //                 // get role id from selection
    //                 const getRoleIdSQL = `select id from role where title=?;`
    //                 employeeId = response[0].id;

    //                 connection.query(getRoleIdSQL, [answers.roles], (error, response) => {
    //                     if (error) throw error;
    //                     roleId = response[0].id;

    //                     console.log('----------');
    //                     console.log("employee id: " + employeeId);
    //                     console.log("role id: " + roleId);

    //                     const updateEmployeeRoleSQL = `update employee set role_id=? where employee.id=?;`
    //                     connection.query(updateEmployeeRoleSQL, [roleId, employeeId], (error, response) => {
    //                         if (error) throw error;
    //                         console.log(response);
    //                         mainPrompt();
    //                     })
    //                 })



    //             });



    //         });

    //     });


    // }




}