INSERT INTO department (name)
VALUES ("Sales"),
       ("Human Resources"),
       ("Legal"),
       ("Engineering");

INSERT INTO role (title, department, salary)
VALUES ("Sales Lead", 1, 90000),
       ("Salesperson", 1, 70000),
       ("Trainer", 2, 65000),
       ("HR Compliance", 2, 50000),
       ("Lawyer", 3, 100000),
       ("Paralegal", 3, 60000),
       ("Senior Engineer", 4, 190000),
       ("Software Engineer", 4, 112000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kenny", "Singh", 1, NULL),
       ("Janice", "Golden", 1, 1),
       ("Barrett", "Cannon", 2, NULL),
       ("Grant", "Morgan", 2, 2),
       ("Debbie", "Becker", 3, NULL),
       ("Emanuel", "Suarez", 3, 3),
       ("Taylor", "Raymond", 4, NULL),
       ("Marissa", "Peters", 4, NULL);