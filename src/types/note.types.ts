export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface CreateNoteInput {
  title: string;
  content: string;
}

export interface NoteSummary {
  id: string;
  title: string;
  createdAt: Date;
}
