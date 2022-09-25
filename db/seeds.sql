INSERT INTO departments (department_name)
VALUES ("Customer Service"),
       ("Shipping"),
       ("Accounting"),
       ("Information Technology");

INSERT INTO roles (department_id, title, salary)
VALUES (1, "Customer Service Manager", "65000"),
       (1, "Customer Service Agent", "40000"),
       (2, "Shipping Manager", "75000"),
       (2, "Shipping Packer", "45000"),
       (3, "Accounting Manager", "85000"),
       (3, "Accountant", "70000"),
       (4, "IT Manager", "95000"),
       (4, "Software Engineer", "80000");

INSERT INTO employees (role_id, first_name, last_name, manager_id)
VALUES (1, "Sporty", "Spice", 1),
       (1, "Posh", "Spice", 0),
       (2, "Scary", "Spice", 3),
       (2, "Baby", "Spice", 0),
       (3, "Ginger", "Spice", 5),
       (3, "Kevin", "Jonas", 0),
       (4, "Nick", "Jonas", 7),
       (4, "Joe", "Jonas", 0);

