/** Core MVP domain types — mirror of supabase/migrations/001_core.sql */

export type ExecutionStatus =
  | "queued"
  | "running"
  | "waiting"
  | "completed"
  | "failed"
  | "cancelled";

export type PermissionScope = "capability" | "loop";
export type PermissionRole = "owner" | "editor" | "viewer";

export type Profile = {
  id: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
};

export type Capability = {
  id: string;
  owner_id: string;
  key: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Action = {
  id: string;
  capability_id: string;
  owner_id: string;
  key: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Loop = {
  id: string;
  owner_id: string;
  title: string;
  goal: string | null;
  status: ExecutionStatus;
  created_at: string;
  updated_at: string;
};

export type Execution = {
  id: string;
  loop_id: string;
  action_id: string | null;
  owner_id: string;
  status: ExecutionStatus;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ExecutionLog = {
  id: string;
  execution_id: string;
  owner_id: string;
  level: "info" | "warn" | "error";
  message: string;
  payload: Record<string, unknown> | null;
  created_at: string;
};

export type Permission = {
  id: string;
  user_id: string;
  scope: PermissionScope;
  capability_id: string | null;
  loop_id: string | null;
  role: PermissionRole;
  created_at: string;
};
