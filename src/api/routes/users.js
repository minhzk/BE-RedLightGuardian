import { Router } from "express";
import { login, logout, getAllUsers, createUser, getUserById, deleteUserById, updateUserById } from "../controllers/user/index.js";

const router = Router();

//POST
router.post('/login', login);
router.post('', createUser);

// GET
router.get('', getAllUsers);
router.get('/:id', getUserById);

// PUT
router.put('/:id', updateUserById)

// DELETE
router.delete('/:id', deleteUserById)
export default router;