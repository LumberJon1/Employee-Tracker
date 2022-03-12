INSERT INTO department (name)
VALUES 
    ("Accounting"),
    ("IT"),
    ("Finance"),
    ("Shipping"),
    ("Manufacturing"),
    ("Engineering"),
    ("Human Resources"),
    ("Sales"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Technical Analyst", 110000, 3),
    ("Driver", 65000, 4),
    ("Developer", 92000, 2),
    ("Lab Tech", 88000, 6),
    ("Compensation Analyst", 78000, 7),
    ("Outbound Sales Rep", 54000, 8),
    ("Contract Attorney", 220000, 9),
    ("Line Worker", 48000, 5),
    ("Line Manager", 60000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Smith", 1, NULL),
    ("John", "Doe", 2, NULL),
    ("Jane", "Doe", 5, NULL),
    ("Emma", "Smith", 3, NULL),
    ("Billy", "Montague", 1, NULL),
    ("Bob", "Sagget", 6, NULL),
    ("Standard", "Phillips", 4, NULL),
    ("Allison", "Lewis", 2, NULL),
    ("Rack", "Nordstrom", 3, NULL),
    ("John", "Frewin", 7, NULL),
    ("Adrian", "Gupta", 7, NULL),
    ("Uriel", "Llewelyn", 9, NULL),
    ("Mariam", "Haggerty", 8, NULL),
    ("Phylis", "Sanders", 6, NULL),
    ("Sherlock", "Moriarty", 4, 2);