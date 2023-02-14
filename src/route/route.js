const { Router } = require("express");
const express=require("express")
const router=express.Router();
const contactController=require("../controller/contactController")


router.post("/contact",contactController.createContact)
router.get("/getContact/:contactId",contactController.getContact)
router.delete("/deleteContact/:contactId",contactController.deleteContact)
router.put("/updateContact/:contactId",contactController.updateContact)



module.exports=router

