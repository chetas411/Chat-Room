const express = require("express");
const router = express.Router();
const userController = require("./userController")

router.get("/",(req,res)=>{
    res.send("Server is running")
});

router.post("/new",userController.create,userController.redirect);
router.post("/login",userController.authenticate,userController.redirect);

module.exports = router;