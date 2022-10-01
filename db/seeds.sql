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
VALUES (1, "Sporty", "Spice", null),
       (2, "Posh", "Spice", 1),
       (3, "Scary", "Spice", null),
       (4, "Baby", "Spice", 3),
       (5, "Ginger", "Spice", null),
       (6, "Kevin", "Jonas", 5),
       (7, "Nick", "Jonas", null),
       (8, "Joe", "Jonas", 7);

