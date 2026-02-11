const { Artifact, Like, Comment } = require("../models/artifact.model");

exports.createArtifact = async (req, res) => {
    const artifact = await Artifact.create({
        ...req.body,
        createdBy: req.user.id
    });
    res.json(artifact);
};

exports.getArtifacts = async (req, res) => {
    const artifacts = await Artifact.find().populate("createdBy", "email");
    res.json(artifacts);
};

exports.likeArtifact = async (req, res) => {
    const like = await Like.create({
        artifactId: req.params.id,
        userId: req.user.id
    });
    res.json(like);
};

exports.unlikeArtifact = async (req, res) => {
    const like = await Like.deleteOne({
        artifactId: req.params.id,
        userId: req.user.id
    });
    res.json(like);
};

exports.commentArtifact = async (req, res) => {
    const comment = await Comment.create({
        artifactId: req.params.id,
        userId: req.user.id,
        comment: req.body.comment
    });
    res.json(comment);
};

exports.uncommentArtifact = async (req, res) => {
    const comment = await Comment.deleteOne({
        artifactId: req.params.id,
        userId: req.user.id
    });
    res.json(comment);
};
