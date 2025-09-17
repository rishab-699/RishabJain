import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    aspectRatio: {
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
        required: true
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
const Design = mongoose.models.designs || mongoose.model('designs', designSchema);

export default Design;