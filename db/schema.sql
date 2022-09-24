DROP DATABASE IF EXISTS humans_db;
CREATE DATABASE humans_db;

USE humans_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY 
    -- IDENTITY (1,1)
    ,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    -- -- not sure on below for manager id setup to get this result manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
    manager_id INT
    --  FOREIGN KEY (manager_id) REFERENCES (id) ON DELETE SET NULL
);
