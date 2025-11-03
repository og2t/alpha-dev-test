-- Create the reversed_texts table
create table if not exists public.reversed_texts (
  id uuid primary key default gen_random_uuid(),
  original_text text not null,
  reversed_text text not null,
  created_at timestamp with time zone default now() not null
);

-- Enable Row Level Security (RLS)
alter table public.reversed_texts enable row level security;

-- Create a policy that allows anyone to read
create policy "Allow public read access"
  on public.reversed_texts
  for select
  to public
  using (true);

-- Create a policy that allows anyone to insert
create policy "Allow public insert access"
  on public.reversed_texts
  for insert
  to public
  with check (true);

-- Create a policy that allows anyone to delete (optional - you may want to restrict this)
create policy "Allow public delete access"
  on public.reversed_texts
  for delete
  to public
  using (true);

-- Create an index on created_at for faster sorting
create index if not exists reversed_texts_created_at_idx
  on public.reversed_texts (created_at desc);

-- Optional: Add a comment to the table
comment on table public.reversed_texts is 'Stores original and reversed text entries from the Word Reverser app';
