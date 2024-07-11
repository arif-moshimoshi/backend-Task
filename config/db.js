const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:password@localhost:3306/task_manager', {
    dialectOptions: {
        multipleStatements: true
    }
});

async function initializeDatabase() {
    try {
        await sequelize.query('CREATE DATABASE IF NOT EXISTS task_manager;');
        await sequelize.query('USE task_manager;');
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

module.exports = { sequelize, initializeDatabase };