import { PrismaClient } from "@prisma/client";
import type { Note, CreateNoteInput } from "../../types/note.types.js";

export class NotesRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateNoteInput): Promise<Note> {
    return this.prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  async findById(id: string): Promise<Note | null> {
    return this.prisma.note.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Note[]> {
    return this.prisma.note.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.prisma.note.delete({
      where: { id },
    });
    return !!result;
  }
}
