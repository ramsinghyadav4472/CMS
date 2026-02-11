const router = require("express").Router();
const artifact = require("../controllers/artifact.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/create", auth, artifact.createArtifact);
router.get("/", auth, artifact.getArtifacts);

//like
router.post("/like/:id", auth, artifact.likeArtifact);
router.post("/unlike/:id", auth, artifact.unlikeArtifact);

//comment
router.post("/comment/:id", auth, artifact.commentArtifact);
router.post("/uncomment/:id", auth, artifact.uncommentArtifact);

module.exports = router;

