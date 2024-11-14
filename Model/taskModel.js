const { mongoose } = require("mongoose");

const taskModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required:true,
    },
    status :{
        type:String,
        enum: ['completed', 'pending'],
        default: 'pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt :{
        type:Date,
        default:Date.now
    }
});

const Task = mongoose.model('Task', taskModel);

module.exports = Task;