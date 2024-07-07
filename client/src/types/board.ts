export interface Column {
  _id: string;
  name: string;
}

export interface Board {
  _id: string;
  title: string;
  description: string;
  owner: string;
  members: string[];
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}
