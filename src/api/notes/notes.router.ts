import { Router } from "express";
import { NotesController } from "./notes.controller.js";

export function createNotesRouter(controller: NotesController): Router {
  const router = Router();

  router.post("/", (req, res, next) => controller.createNote(req, res, next));
  router.get("/", (req, res, next) => controller.getAllNotes(req, res, next));
  router.get("/:id", (req, res, next) => controller.getNoteById(req, res, next));
  router.delete("/:id", (req, res, next) =>
    controller.deleteNote(req, res, next)
  );

  return router;
}
