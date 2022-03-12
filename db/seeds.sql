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

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ("John", "Smith", 1),
    ("John", "Doe", 2),
    ("Jane", "Doe", 5),
    ("Emma", "Smith", 3),
    ("Billy", "Montague", 1),
    ("Bob", "Sagget", 6),
    ("Standard", "Phillips", 4),
    ("Allison", "Lewis", 2),
    ("Rack", "Nordstrom", 3),
    ("John", "Frewin", 7),
    ("Adrian", "Gupta", 7),
    ("Uriel", "Llewelyn", 9),
    ("Mariam", "Haggerty", 8),
    ("Phylis", "Sanders", 6),
    ("Sherlock", "Moriarty", 4);