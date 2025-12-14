import express, { Express, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { NotesRepository } from "../data/notes/notes.repository.js";
import { NotesService } from "../core/notes/notes.service.js";
import { NotesController } from "./notes/notes.controller.js";
import { createNotesRouter } from "./notes/notes.router.js";
import { AppError } from "../core/errors.js";

export function createApp(prisma: PrismaClient): Express {
  const app = express();

  app.use(express.json());

  const notesRepository = new NotesRepository(prisma);
  const notesService = new NotesService(notesRepository);
  const notesController = new NotesController(notesService);
  const notesRouter = createNotesRouter(notesController);

  app.use("/notes", notesRouter);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof AppError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }

    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
