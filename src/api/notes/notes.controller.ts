import { Request, Response, NextFunction } from "express";
import { NotesService } from "../../core/notes/notes.service.js";
import type { CreateNoteInput } from "../../types/note.types.js";

export class NotesController {
  constructor(private service: NotesService) {}

  async createNote(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const input = req.body as CreateNoteInput;
      const note = await this.service.createNote(input);
      res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  }

  async getNoteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const note = await this.service.getNoteById(id);
      res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  }

  async getAllNotes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const notes = await this.service.getAllNotes();
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.deleteNote(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
