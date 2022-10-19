INSERT INTO department(name)
VALUE   ("IT"),
        ("HR"),
        ("Marketing"),
        ("Sales"),
        ("Accounting");

INSERT INTO roles(title, salary, department_id)
VALUE   ( "Manager", 90000, 1),
        ( "Manager", 70000, 2),
        ( "Manager", 60000, 4),
        ( "Manager", 80000, 5),
        ( "Engineer", 80000, 1),
        ( "Asscoiate", 50000, 4),
        ( "Accountant", 60000, 5),
        ( "Assistant", 70000, 2),
        ( "Asscociate", 50000, 3);

INSERT INTO employee(first_name, last_name, roles_id, manager_id)
VALUE   ( 'Liam', 'Clarke', 1, 1),
        ( 'Jack', 'London', 1, 1),
        ( 'Robert', 'Bruce', 1, 1),
        ( 'Peter', 'Greenway', 1, 1),
        ( 'Derek', 'Jarman', 5, 1),
        ( 'Paolo', 'Pasolini', 6, 2),
        ( 'heathcote', 'Williams', 6, 2),
        ( 'Dsandy', 'Powell', 7, 3),
        ( 'Emil', 'Zola', 7, 3),
        ( 'Sissy', 'Coalpitts', 7, 3),
        ( 'Antionette', 'Capet', 7, 3),
        ( 'Samuel', 'Delany', 7, 3),
        ( 'Tony', 'Duvert', 9, null);