const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table')


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
})


db.connect(function(err){
    if (err) throw err;
    init();
})


function init() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Welcome to our employee database! What would you like to do?',
            choices: [
                    'View all employees',
                    'View all departments',
                    'View all roles',
                    'Add an employee',
                    'Add a department',
                    'Add a role',
                    'Update employee role',
                    'Delete an employee',
                    'EXIT'
                    ]
            }).then(function (answer) {
                switch (answer.action) {
                    case 'View all employees':
                        viewEmployees();
                        break;
                    case 'View all departments':
                        viewDepartments();
                        break;
                    case 'View all roles':
                        viewRoles();
                        break;
                    case 'Add an employee':
                        addEmployee();
                        break;
                    case 'Add a department':
                        addDepartment();
                        break;
                    case 'Add a role':
                        addRole();
                        break;
                    case 'Update employee role':
                        updateRole();
                        break;
                    case 'Delete an employee':
                        deleteEmployee();
                        break;
                    case 'EXIT': 
                        exitApp();
                        break;
                    default:
                        break;
                }
        })
};

// view all employees in the database
function viewEmployees() {
    var query = 'SELECT  employee.first_name AS FirstName,employee.last_name AS LastName, roles.title AS Title, roles.salary FROM roles JOIN employee ON employee.roles_id = roles.id ORDER BY employee.id';
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Employees:', res); 
        init();
    })
};

// view all departments in the database
function viewDepartments() {
    var query = 'SELECT * FROM department';
    db.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        init();
    })
};


function viewRoles() {
    var query = 'SELECT roles.title AS Title, department.name AS Department, roles.salary FROM roles LEFT JOIN department ON department.id = roles.department_id ORDER BY department.id';
    db.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        init();
    })
};

function addEmployee() {
    db.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input', 
                    message: "What is the employee's fist name? ",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'role', 
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is this employee's role? "
                }
                ]).then(function (answer) {
                    let roles_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            roles_id = res[a].id;
                            console.log(roles_id)
                        }                  
                    }  
                    db.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        roles_id: roles_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        init();
                    })
                })
        })
};


function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                db.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                db.query(query, function(err, res) {
                if(err)throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                init();
                })
            })
};


function addRole() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            db.query(
                'INSERT INTO roles SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    init();
                })
        })
    })
};
function exitApp() {
    db.end();
};