const express = require("express");
const router = express.Router();
const multer = require('multer');
const UserController = require("../controllers/user-controller");
const authenticateToken = require('../middleware/auth');
const PostController = require("../controllers/post-controller");

const uploadDestination = 'uploads'

//Показываем, где хранить файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function(req, file, callBack) {
    callBack(null, file.originalname)
  }
})

const uploads = multer({ storage: storage })

//Routes для пользователя
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/current", authenticateToken, UserController.current);
router.get("/users/:id", authenticateToken, UserController.getUserById);
router.put("/users/:id", authenticateToken, UserController.updateUser);

//Routes для постов
router.post('/posts', authenticateToken, PostController.createPost)
router.get('/posts', authenticateToken, PostController.getAllPost)
router.get('/posts/:id', authenticateToken, PostController.getPostById)
router.delete('/posts/:id', authenticateToken, PostController.deletePost)

module.exports = router;