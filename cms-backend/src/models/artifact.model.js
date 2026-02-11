const mongoose = require("mongoose");
const artifactSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    { timestamps: true },
);

const likeSchema = new mongoose.Schema({
    artifactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artifact"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    { timestamps: true },
);

const commentSchema = new mongoose.Schema({
    artifactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artifact"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: String
},
    { timestamps: true },
);

module.exports = {
    Artifact: mongoose.model("Artifact", artifactSchema),
    Like: mongoose.model("Like", likeSchema),
    Comment: mongoose.model("Comment", commentSchema)
};