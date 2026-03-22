import { DateTime } from "next-auth/providers/kakao";

export interface Plan {
  id?: string;
  name: string;
  price: number;
  capacity: number;

  created_at: DateTime;
  update_at: DateTime;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  planId: string;
  role: string;

  created_at: DateTime;
  update_at: DateTime;
}

export interface UserStorage {
  id?: string;
  userId: string;
  capacity: number;
  used: number;

  created_at: DateTime;
  update_at: DateTime;
}

export interface Folder {
  id?: string;
  userId: string;
  name: string;
  parentId: string;

  created_at: DateTime;
  update_at: DateTime;
}

export interface File {
  id?: string;
  userStorageId: string;
  folderId: string;
  name: string;
  type: string;
  size: string;
  s3_key: string;
  is_deleted: boolean;

  uploaded_at: DateTime;
  deleted_at: DateTime;
  created_at: DateTime;
  update_at: DateTime;
}
