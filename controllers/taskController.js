const Task = require('../models/Task');
const { statusCode } = require("../utils/constants");
exports.getTasks = async (req, res) => {
    try {
        const { priority, order = 'ASC' } = req.query;
        let where = {};
        
        if (priority) {
            where.priority = priority;
        }

        const tasks = await Task.findAll({ 
            where, 
            order: [['createdAt', order.toUpperCase()]]
        });

        return res.status(statusCode.Success).json({            
            data: tasks,
            error: false
        });
    } catch (error) {
        return res.status(statusCode.Failure).json({                        
            error: true,
            error: error?.message
        });
    }
};



exports.addTask = async (req, res) => {
    try {
        const { heading, description, date, time, priority } = req.body;
        if (req.file) {
            const path = req.file.path;
            req.body.image = `${req.protocol}://${req.get('host')}/${path}`;            
        }        
        const task = await Task.create({ heading, description, date, time, image:req.body.image, priority });
        return res.status(statusCode.Success).json({            
            data:task,
            error:false
        });
    } catch (error) {
        return res.status(statusCode.Failure).json({            
            message:error.message,            
            error:false
        });
    }
};

exports.editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {};
        
        if (req.body.heading !== undefined) updateData.heading = req.body.heading;
        if (req.body.description !== undefined) updateData.description = req.body.description;
        if (req.body.date !== undefined) updateData.date = req.body.date;
        if (req.body.time !== undefined) updateData.time = req.body.time;
        if (req.body.priority !== undefined) updateData.priority = req.body.priority;        
        if (req.file) {
            const path = req.file.path;
            updateData.image = `${req.protocol}://${req.get('host')}/${path}`;
        }
        const task = await Task.findByPk(id);
        if (task) {            
            await task.update(updateData);            
            const updatedTask = await Task.findByPk(id);
            return res.status(statusCode.Success).json({            
                data:updatedTask,
                error:false
            });
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Task.destroy({ where: { id } });

        if (result) {
            return res.status(statusCode.Success).json({            
                message:"deleted",
                error:false
            });
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);

        if (task) {
            return res.status(statusCode.Success).json({            
                data:task,
                error:false
            });
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
