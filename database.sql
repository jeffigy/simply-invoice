CREATE DATABASE simply_invoice;

CREATE TABLE invoices (
    invoice_id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    subtotal DECIMAL(10, 2),
    discount DECIMAL(10, 2) DEFAULT 0,
    tax DECIMAL(10, 2),
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    invoices (
        customer_name,
        due_date,
        status,
        subtotal,
        discount,
        tax,
        total_amount
    )
VALUES
    (
        'Alice Johnson',
        '2024-11-30',
        'Pending',
        1500.00,
        50.00,
        225.00,
        1675.00
    ),
    (
        'Bob Smith',
        '2024-12-05',
        'Paid',
        2000.00,
        100.00,
        285.00,
        2185.00
    ),
    (
        'Charlie Brown',
        '2024-11-28',
        'Overdue',
        1750.00,
        0,
        262.50,
        2012.50
    ),
    (
        'Daisy Lee',
        '2024-12-15',
        'Pending',
        500.00,
        10.00,
        73.50,
        563.50
    ),
    (
        'Edward Chang',
        '2024-11-20',
        'Cancelled',
        3000.00,
        150.00,
        427.50,
        3277.50
    ),
    (
        'Fiona Clark',
        '2024-12-02',
        'Pending',
        1250.00,
        50.00,
        180.00,
        1380.00
    ),
    (
        'George Hall',
        '2024-12-10',
        'Paid',
        2750.00,
        0,
        412.50,
        3162.50
    ),
    (
        'Helen Kim',
        '2024-11-18',
        'Overdue',
        950.00,
        25.00,
        138.75,
        1063.75
    ),
    (
        'Ivy Williams',
        '2024-12-07',
        'Pending',
        4000.00,
        200.00,
        570.00,
        4370.00
    ),
    (
        'Jake Martinez',
        '2024-11-25',
        'Cancelled',
        650.00,
        0,
        97.50,
        747.50
    );