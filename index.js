const inquirer = require('inquirer');
require('console.table');
const mysql = require("mysql2");

//const app = express();

//This inits mySQL2
const sqlConnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employees_db",
});

//connects mySQL
sqlConnect.connect((err) => {
  if (err) throw err;
  console.log('Database Connected');
});



//loads the prompts at application load
loadPrompts();

//inquirer loads all prompts to console in a list 
function loadPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an option. What would you like to do?",
        choices: [
          {
            name: "View Employees",
            value: "EMPLOYEES_VIEW",
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "Add Role",
            value: "ADD_ROLE",
          },
          {
            name: "Update Role",
            value: "UPDATE_ROLE",
          },
          {
            name: "Quit",
            value: "QUIT",
          },
        ],
      },
    ])
    .then((answer) => {
      let choice = answer.choice;
      switch (choice) {
        case "EMPLOYEES_VIEW":
          viewEmployees();
          break;
        case "DEPARTMENT_VIEW":
          viewDepartments();
          break;
        case "MANAGER_VIEW":
          viewByManager();
          break;
        case "ADD_EMPLOYEE":
          addEmployee();
          break;
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;
        case "ADD_DEPARTMENT":
          addDepartment();
          break;
        case "VIEW_ROLES":
          viewRoles();
          break;
        case "ADD_ROLE":
          addRole();
          break;
        case "UPDATE_ROLE":
          updateRole();
          break;
        case "QUIT":
          sqlConnect.end();
          break;
      }
    });
}

//view all employees
function viewEmployees() {
  const result = `SELECT * FROM employees;`
  sqlConnect.query(result, (err, res) => {
    console.table(res);
    loadPrompts();
  });
}

//view all roles
function viewRoles() {
  const result = `SELECT * FROM roles;`
  sqlConnect.query(result, (err, res) => {
    console.table(res);
    loadPrompts();
  });
}

//view Departments
function viewDepartments() {
  const result = `SELECT * FROM departments;`
  sqlConnect.query(result, (err, res) => {
    console.table(res);
    loadPrompts();
  });
}

//view by manager
function viewByManager() {
  const result = `SELECT * FROM manager_id`
  sqlConnect.query(result, (err, res) => {
    console.table(res);
    loadPrompts();
  });
}

function updateEmpRole(id, roles_id) {
  const result = "UPDATE employees SET ? WHERE ?;";
  let params = [roles_id, id];
  sqlConnect.query(result, params, (err, results) => {
    if (err) {
      console.log(results);
      console.log('error updating employee role')
      return console.log(err);
    }
  });
}
//department add
function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "addDepartment",
      message: "Enter department name"
    },
  ])
    .then(function (res) {
      const result = `INSERT INTO departments (name)
                            VALUES(?)`;
      sqlConnect.query(result, res.addDepartment, (err, res) => {
        if (err) throw err;
        console.table(res);
        loadPrompts();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter First Name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter Last Name",
      },
      {
        type: "input",
        name: "roles_id",
        message: "Enter Role ID",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter Manager's ID",
      },
    ])
    .then(function (res) {
      const result = `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
                            VALUES(?,?,?,?)`;
      const empProps = [
        res.first_name,
        res.last_name,
        res.roles_id,
        res.manager_id,
      ];
      sqlConnect.query(result, empProps, (err, res) => {
        if (err) throw err;
        console.table(res);
        loadPrompts();
      });
    });
}

//add role
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "Enter role"
    },
    {
      type: "input",
      name: "salary",
      message: "Enter salary"
    },
    {
      type: "input",
      name: "department_id",
      message: "Enter Department ID"
    },
  ])
    .then(function (res) {
      const result = `INSERT INTO roles (title, salary, department_id) VALUES(?,?,?);`;
      const empProps = [
        res.role,
        res.salary,
        res.department_id
      ];
      sqlConnect.query(result, empProps, (err, res) => {
        if (err) throw err;
        console.table(res);
        loadPrompts();
      });
    });
}
  
function updateRole() {

    const result = `SELECT * FROM employees;`;
    sqlConnect.query(result, (err, res) => {
      const employee_choices = res.map(
        ({employees_id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: `${employees_id}`,
        })
      );
      inquirer.
        prompt([
      {
        type: "list",
        name: "employees_id",
        message: "Which employee would you like to update?",
        choices: employee_choices
      },
        ]).then((res) => {
         let id = res;
         const result = `SELECT * FROM roles;`;
      sqlConnect.query(result, (err, res) => {
        const role_choices = res.map(({ roles_id, title }) => ({
          name: `${title}`,
          value: `${roles_id}`,
        }));
        inquirer.prompt([
          {
            type: "list",
            name: "roles_id",
            message: "What is the updated role?",
            choices: role_choices,
          },
        ])
          .then((res) => updateEmpRole(id, res))
          .then(() => loadPrompts())
      });
      });
    });
  };

