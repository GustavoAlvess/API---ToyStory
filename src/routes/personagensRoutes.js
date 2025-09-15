import express from "express";
import {getAllPersonagens, getByIdPersonagens, createPersonagem, deletePersonagem, updatePersonagem, getPersonagensByEstoque} from "../controllers/personagensController.js";

const router = express.Router();

router.get("/", getAllPersonagens);
router.get("/:id", getByIdPersonagens);
router.post("/", createPersonagem);
router.delete("/:id", deletePersonagem);
router.put("/:id", updatePersonagem)
router.get("/mais/Estoque", getPersonagensByEstoque)


export default router;