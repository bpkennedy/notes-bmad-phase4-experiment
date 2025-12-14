import { NotesRepository } from "../../data/notes/notes.repository.js";
import { ValidationError, NotFoundError } from "../errors.js";
import type { Note, CreateNoteInput, NoteSummary } from "../../types/note.types.js";

export class NotesService {
  constructor(private repository: NotesRepository) {}

  async createNote(input: CreateNoteInput): Promise<Note> {
    this.validateCreateInput(input);
    return this.repository.create(input);
  }

  async getNoteById(id: string): Promise<Note> {
    const note = await this.repository.findById(id);
    if (!note) {
      throw new NotFoundError(`Note with id ${id} not found`);
    }
    return note;
  }

  async getAllNotes(): Promise<NoteSummary[]> {
    const notes = await this.repository.findAll();
    return notes.map((note) => ({
      id: note.id,
      title: note.title,
      createdAt: note.createdAt,
    }));
  }

  async deleteNote(id: string): Promise<void> {
    const note = await this.repository.findById(id);
    if (!note) {
      throw new NotFoundError(`Note with id ${id} not found`);
    }
    await this.repository.delete(id);
  }

  private validateCreateInput(input: CreateNoteInput): void {
    if (!input.title || input.title.trim().length === 0) {
      throw new ValidationError("title is required and cannot be empty");
    }
    if (!input.content || input.content.trim().length === 0) {
      throw new ValidationError("content is required and cannot be empty");
    }
  }
}
