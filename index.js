const inquirer = require('inquirer');
require('console.table');
const mysql = require("mysql2");

//const app = express();

//This inits mySQL2
const sqlConnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employees",
});

//connects mySQL
sqlConnect.connect(function (err) {
  if (err) throw err;
  console.log('Database Connected');
});



//loads the prompts at application load
loadPrompts();

//inquirer loads all prompts to console in a list 
function loadPrompts() {
  inquirer.prompt([
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
          name: "View Employees By Department",
          value: "DEPARTMENT_VIEW",
        },
        {
          name: "View Employees By Manager",
          value: "MANAGER_VIEW",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "RM_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_MANAGER",
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
          name: "Remove Department",
          value: "RM_DEPARTMENT",
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
          name: "Remove Role",
          value: "RM_ROLE",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((answer) => {
    let choice = answer.choice;
    switch (choice) {
      case "EMPLOYEES_VIEW":
        viewEmployees();
        break;
      case "DEPARTMENT_VIEW":
        viewDepartment();
        break;
      case "MANAGER_VIEW":
        viewByManager();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "RM_EMPLOYEE":
        removeEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "UPDATE_MANAGER":
        updateManager();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "RM_DEPARTMENT":
        removeDepartment();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "RM_ROLE":
        removeRole();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      default:
        quit();
    }
  });
}

function viewEmployees() {
  const result = `SELECT * FROM employees`
  sqlConnect.query(result, (err, res) => {
    console.table(res);
    loadPrompts();
  });
}

function viewRoles() {
  const result = `SELECT * FROM roles`
  sqlConnect.query(result, (err, res) => {
    console.table(res);
    loadPrompts();
  });
}

function viewDepartments() {
  const result = `SELECT * FROM departments`;
  sqlConnect.query(result, (err, res) => {
    console.table(res);
    loadPrompts();
  });
}