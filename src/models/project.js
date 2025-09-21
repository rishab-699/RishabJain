import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    fileId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    width: { 
        type: Number,
                required: true

    },
    height: { 
        type: Number,
                required: true
 
    },
    size: { 
        type: Number,
                required: true
 
    },
}, {
    timestamps: true
});

// Check if model already exists to prevent OverwriteModelError
const project = mongoose.models.projects || mongoose.model('projects', projectSchema);

export default project;