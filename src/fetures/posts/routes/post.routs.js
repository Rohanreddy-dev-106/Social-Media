
import PostController from "../controller/post.controller.js";
import jwtAuth from "../../middlewares/jwt.Auth.js"
import express from "express"



const router=express.Router();

router.get("/allposts",PostController.getAllpost)
router.post("/create",PostController.creatpost)
router.put("/update",PostController.updatepost)
router.delete("/delete", PostController.deletepost)



export default router;