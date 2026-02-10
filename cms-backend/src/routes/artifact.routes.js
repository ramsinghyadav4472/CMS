const router = require("express").Router();
const artifact = require("../controllers/artifact.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/create", auth, artifact.createArtifact);
router.get("/", auth, artifact.getArtifacts);

module.exports = router;