-- Insert a stats row
INSERT INTO stats (
        total_sales,
        total_orders,
        total_customers,
        revenue_change,
        orders_change,
        customers_change
    )
VALUES (12345.67, 321, 200, 5.4, -2.1, 3.2) ON CONFLICT DO NOTHING;
-- Charts sample (e.g., sales per month simplified)
INSERT INTO charts (label, value)
VALUES ('Jan', 4000),
    ('Feb', 3000),
    ('Mar', 5000),
    ('Apr', 4500) ON CONFLICT DO NOTHING;
-- Recent orders
INSERT INTO orders (customer_name, product, price, status)
VALUES ('Alice', 'Product A', 99.99, 'Delivered'),
    ('Bob', 'Product B', 49.5, 'Pending'),
    ('Carol', 'Product C', 150.0, 'Shipped') ON CONFLICT DO NOTHING;
-- Activities
INSERT INTO activities (description, type)
VALUES ('Order #101 placed', 'order'),
    ('User John signed up', 'user'),
    ('Payment received for #99', 'payment') ON CONFLICT DO NOTHING;
-- Users sample
INSERT INTO users (name, email, role)
VALUES ('Alice', 'alice@example.com', 'admin'),
    ('Bob', 'bob@example.com', 'user') ON CONFLICT DO NOTHING;
-- Products sample
INSERT INTO products (name, price, stock)
VALUES ('Product A', 99.99, 12),
    ('Product B', 49.5, 40) ON CONFLICT DO NOTHING;
-- Messages sample
INSERT INTO messages (sender, subject, body, read)
VALUES (
        'support@example.com',
        'Welcome',
        'Welcome to the panel',
        false
    ),
    (
        'noreply@example.com',
        'Report Ready',
        'Your report is ready',
        true
    ) ON CONFLICT DO NOTHING;
-- Settings sample
INSERT INTO settings (key, value)
VALUES ('site_name', 'AdminPanel'),
    ('items_per_page', '20'),
    ('allow_signups', 'true') ON CONFLICT DO NOTHING;