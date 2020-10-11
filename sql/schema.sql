DROP DATABASE IF EXISTS employee_tracking_DB;
CREATE DATABASE employee_tracking_DB;

USE employee_tracking_DB;

CREATE TABLE department(
 id INT PRIMARY KEY,
 name VARCHAR(30)
);

CREATE TABLE role(
id INT PRIMARY KEY, 
title VARCHAR(30),
salary DECIMAL(13,2),
department_id INT(5)
);

CREATE TABLE employee(
id INT PRIMARY KEY AUTO_INCREMENT, 
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT(5),
manager_id INT(5)
);


