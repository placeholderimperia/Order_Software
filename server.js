const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory storage for orders (for demonstration purposes)
let orders = [];

// Middleware to parse JSON
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the order management system!');
});

// API to create an order
app.post('/order', (req, res) => {
    const { customerName, product, quantity } = req.body;
    
    if (!customerName || !product || !quantity) {
        return res.status(400).send('Please fill in all fields: customerName, product, quantity');
    }

    const newOrder = {
        id: orders.length + 1,
        customerName,
        product,
        quantity,
        status: 'pending',
    };

    orders.push(newOrder);
    res.status(201).send(newOrder);
});

// API to view all orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

// API to change order status
app.put('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;

    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).send('Order not found');
    }

    order.status = status;
    res.send(order);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
