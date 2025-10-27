
import PostController from "../controller/post.controller.js";
import jwtAuth from "../../middlewares/jwt.Auth.js"
import express from "express"



const router=express.Router();

router.get("/allposts",jwtAuth,PostController.getAllpost)
router.post("/create",jwtAuth ,PostController.creatpost)
router.put("/update",jwtAuth ,PostController.updatepost)
router.delete("/delete",jwtAuth, PostController.deletepost)



export default router;