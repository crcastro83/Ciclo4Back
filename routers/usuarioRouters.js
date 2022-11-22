const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({msg: "desde router Get"})
})

router.post("/", (req, res) => {
    res.json({msg: "desde router post que es crear"})
})

router.put("/", (req, res) => {
    res.json({msg: "desde router put que es actualizar"})
})

router.delete("/", (req, res) => {
    res.json({msg: "desde router delete que es borrar"})
})

module.exports = router;