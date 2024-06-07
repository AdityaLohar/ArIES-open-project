import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { createPost, deletePost, getPost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts } from "../controllers/postController.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts)
router.get("/:id", protectRoute, getPost)
router.get("/user/:username", protectRoute, getUserPosts)
router.post("/create", protectRoute, createPost)
router.delete("/:id", protectRoute, deletePost)
router.put("/like/:id", protectRoute, likeUnlikePost)
router.put("/reply/:id", protectRoute, replyToPost)

export default router
