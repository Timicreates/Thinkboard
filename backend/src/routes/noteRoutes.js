import express from "express";

import {
  getAllNotes,
  putNotes,
  createNotes,
  deleteNotes,
  getNotesById,
} from "../controllers/notesController.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNotesById);

router.post("/", createNotes);

router.put("/:id", putNotes);
router.delete("/:id", deleteNotes);

export default router;
