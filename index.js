const prompt = require('inquirer');
const { init } = require('../note-taker/routes');
const database = require("./database");

function loadPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose an option",
      choices: [
        {
          name: "View Employees",
          value: "EMPLOYEES_VIEW"
        },
        {
          name: "View Employees By Department",
          value: "DEPARTMENT_VIEW"
        },
        {
          name: "View Employees By Manager",
          value: "MANAGER_VIEW"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Remove Employee",
          value: "RM_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_MANAGER"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Remove Role",
          value: "RM_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Remove Department",
          value: "RM_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]).then(answer => {
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
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "RM_ROLE":
        removeRole();
        break;
      case "ADD_ROLE":
        addRole();
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
      default:
        quit();
    }
  })
}