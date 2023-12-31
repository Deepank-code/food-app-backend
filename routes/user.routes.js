import { Router } from "express";
import {
  registerUser,
  signin,
  getProfile,
  forget,
  reset,
  logout,
  changePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";
import { authorizedRoles, isLoggedin } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
const router = Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/signin", signin);
router.get("/profile", isLoggedin, getProfile);

router.post("/reset", forget);
router.post("/reset/:resetToken", reset);
router.post("/password/update", isLoggedin, changePassword);
router.put(
  "/profile/update",
  upload.single("avatar"),
  isLoggedin,
  updateProfile
);
router.route("/logout").get(logout);
router.get("/admin/all_user", isLoggedin, authorizedRoles("ADMIN"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isLoggedin, authorizedRoles("ADMIN"), getSingleUser)
  .put(isLoggedin, authorizedRoles("ADMIN"), updateUserRole)
  .delete(isLoggedin, authorizedRoles("ADMIN"), deleteUser);
export default router;
