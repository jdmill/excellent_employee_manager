INSERT INTO departments (name)
VALUES ('Sales'),('Management'),('Development'),('IT'),('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales', 55000, 1),('Manager', 70000, 2),('Software Engineer', 90000, 3),('IT', 65000, 4),('Marketing Specialist', 45000, 5);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ('Jon', 'Miller', 3, 2),('Jung Hoon', 'Yoon', 2, null), ('Keanu', 'Reeves', 5, 2), ('Peter', 'Parker', 4, 2), ('Super', 'Man', 1, 2);