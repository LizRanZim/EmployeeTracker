// Import and requrie express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import and require console.table
const cTable = require('console.table');
// Import and require sequalizer
const sequelize = require('./config/connection');
// Import and require inquirer
const inquirer = require('inquirer');
// Import and require employee class
const Employee = require('./lib/employee')

const employeeArray = []


// if query reference is required form another folder use below
// const runQuery = require('./helpers/')

const app = express();
const PORT = process.env.PORT || 3001;


// // Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Connect to the database before starting the Express.js server *** when I enable sequalize it ends inquirer before I can answer questions
// sequelize.sync().then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//   });

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '2Wins2!!',
        database: 'humans_db'
    },
    console.log(`Connected to the humans_db database.`)
);

app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`);
});

// let menuChoice =''
function showMenu() {

    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add an employee', 'Update an employee role', 'View all roles', 'Add a role', 'View all departments', 'Add a department', 'Quit'],
            name: 'mainMenu',

        },

    ])

        // // Test inquiry menu
        //         .then((response) => {
        //            console.log(response.menuChoice);
        //            push 
        //            return

        //         })

        // Real function will be something like this:

        .then((response) => {
            if (response.mainMenu === 'View all employees') {
                viewEmployees();

            } else if (response.mainMenu === 'Add an employee') {
                addEmployee();

            } else if (response.mainMenu === 'Update an employee role') {
                updateRole();

            } else if (response.mainMenu === 'View all roles') {
                viewRoles();

            } else if (response.mainMenu === 'Add a role') {
                addRole();

            } else if (response.mainMenu === 'View all departments') {
                viewDepartments();

            } else if (response.mainMenu === 'Add a department') {
                addDepartment();

            } else if (response.mainMenu === 'Quit') {
                process.exit();

            }



        });
}


// This starts the application
showMenu();

function viewEmployees() {

    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, employees.manager_id from employees JOIN roles ON employees.id = roles.id', function (err, results) {
        if (err) throw err;
        console.table(results)
        showMenu();
    });

}

function addEmployee() {

    // get all the applicable role info
    db.query('SELECT * from roles', function (err, results) {
        if (err) throw err;
        console.log(results)

        // input array of role info
        // output array of role titles

        const roleTitles = results.map(function (role) {
            return { name: role.title, value: role.id };
        })

        // should display a list of role titles
        console.log(roleTitles);

        db.query('SELECT * from employees', function (err, managerResults) {
            if (err) throw err;
            console.log(managerResults)

            const managerTitles = managerResults.map(function (manageTitle) {
                return { name: manageTitle.first_name, value: manageTitle.manager_id };
            })

            console.log(managerTitles)
            // map the manager info into a choices array



            // then prompt
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is the first name of the employee?',
                        name: 'employeeFirstName',

                    },

                    {
                        type: 'input',
                        message: 'What is the last name of the employee?',
                        name: 'employeeLastName',

                    },
                    {
                        type: 'list',
                        message: 'What is the role of the employee?',
                        name: 'employeeRole',
                        choices: roleTitles,


                    },
                    {
                        type: 'list',
                        message: 'Who is the manager of the employee',
                        name: 'employeeManager',
                        // use the mapped manager choices
                        choices: managerTitles,

                    },

                ])

                .then((response) => {
                    console.log(response)

                    const employee = new Employee(
                        response.employeeFirstName,
                        response.employeeLastName,
                        response.employeeRole,
                        response.employeeManager,

                    )
                    employeeArray.push(employee);
                    console.log(employeeArray, "New employee Added to Array");
                    // insert response into employees table
                    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager], function (err, results) {
                        if (err || !(response.employeeFirstName)) {
                            console.error(err);

                        } else {
                            console.log(response.employeeFirstName, response.employeeLastName, "added to employees DB");
                        }
                    });


                    showMenu();
                });
        });
    })
}

function updateRole() {

    db.query('SELECT * from roles', function (err, results) {
        if (err) throw err;
        console.log(results)

        // input array of role info
        // output array of role titles

        const roleTitles2 = results.map(function (role2) {
            return { name: role2.title, value: role2.id };
        })

        // should display a list of role titles
        console.log(roleTitles2);

        db.query('SELECT * from employees', function (err, employeeResults) {
            if (err) throw err;
            // console.log(employeeResults)

            const employeeNames = employeeResults.map(function (empName) {

                let fullName = empName.first_name + " " + empName.last_name
                return { name: fullName, value: empName.id };
            })

            // console.log(employeeNames)


            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: 'Which employee\'s role do you want to update?',
                        choices: employeeNames,
                        name: 'updatedEmployee'

                    },

                    {
                        type: 'list',
                        message: 'What role do you want to assign the selected employee?',
                        choices: roleTitles2,
                        name: 'updatedRole'

                    },


                ])

                .then((response) => {
                    // console.log(response)


                    // insert response into employees table
                    db.query('UPDATE employees SET role_id = ? where id = ?', [response.updatedRole, response.updatedEmployee], function (err, results) {
                        if (err) {
                            console.error(err);

                        } else {

                            // I can't get my confirm message to show without console.log(results) 
                            console.log(results);
                            console.log('This employee role has been updated');
                        }
                    });


                    showMenu();
                });
        });
    })
}


function addRole() {
    db.query('SELECT * from departments', function (err, results) {
        if (err) throw err;
        console.log(results)

        // input array of role info
        // output array of role titles

        const departmentRoles = results.map(function (role3) {
            return { name: role3.department_name, value: role3.id };
        })

        // should display a list of role titles
        console.log(departmentRoles);

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role',
                    name: 'roleName'

                },

                {
                    type: 'input',
                    message: 'What is the salary of the role',
                    name: 'roleSalary'
                },

                {
                    type: 'list',
                    message: 'What department does the role belong to',
                    choices: departmentRoles,
                    name: 'departmentChoice'
                },



            ])

            .then((response) => {
                // console.log(response)


                // insert response into departments table
                db.query('INSERT INTO roles (salary, title, department_id) VALUES (?,?,?)', [response.roleSalary, response.roleName, response.departmentChoice],

                    function (err, results) {
                        if (err) {
                            console.error(err);

                        } else {

                            // I can't get my confirm message to show without console.log(results) 
                            console.log(results);
                            console.log('This employee role has been added');
                        }
                    });




                showMenu();
            });
    });
}







function viewRoles() {

    db.query('SELECT * from roles', function (err, results) {
        if (err) throw err;
        console.table(results)
        showMenu();
    });

}




function viewDepartments() {

    db.query('SELECT * from departments', function (err, results) {
        if (err) throw err;
        console.table(results)
        showMenu();
    });

}


function addDepartment() {

    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department you want to add?',
                name: 'departmentName'

            },


        ])

        .then((response) => {
            // console.log(response)


            // insert response into departments table
            db.query('INSERT INTO departments (department_name) VALUES (?)', [response.departmentName],

                function (err, results) {
                    if (err) {
                        console.error(err);

                    } else {

                        // I can't get my confirm message to show without console.log(results) 
                        console.log(results);
                        console.log('This department has been added');
                    }
                });




            showMenu();
        });
}
