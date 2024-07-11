const express = require('express');
const taskRoutes = require('./routes/taskRoute');
const cors = require("cors");
const app = express();
const { sequelize, initializeDatabase } = require('./config/db');
const port = 3001;


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets',express.static('assets'))

// Routes
app.use('/api/tasks', taskRoutes);
async function startServer() {
    try {
        await initializeDatabase();
        await sequelize.sync();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}

startServer();