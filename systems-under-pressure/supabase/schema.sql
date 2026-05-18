create extension if not exists "pgcrypto";

create table if not exists groups (
  id uuid primary key default gen_random_uuid(),
  group_name text not null unique,
  student_names text,
  scenario_id text,
  custom_title text default '',
  custom_focus text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists progress_items (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  class_phase text not null,
  item_key text not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(group_id, item_key)
);

create table if not exists group_notes (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  class_phase text not null,
  note_author text not null default 'Unidentified student',
  note_text text default '',
  updated_at timestamptz not null default now()
);

alter table group_notes add column if not exists note_author text not null default 'Unidentified student';
alter table group_notes drop constraint if exists group_notes_group_id_class_phase_key;
create unique index if not exists group_notes_group_class_author_idx
  on group_notes(group_id, class_phase, note_author);

create table if not exists checkpoints (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  checkpoint_number integer not null,
  status text not null default 'Not started'
    check (status in ('Not started', 'In progress', 'Ready for feedback', 'Feedback given', 'Revised')),
  student_summary text default '',
  strengths text default '',
  next_steps text default '',
  concerns text default '',
  teacher_notes text default '',
  updated_at timestamptz not null default now(),
  unique(group_id, checkpoint_number)
);

alter table groups enable row level security;
alter table progress_items enable row level security;
alter table group_notes enable row level security;
alter table checkpoints enable row level security;

-- Vercel API routes use the service role key server-side.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY in frontend code.
