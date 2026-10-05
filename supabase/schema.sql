-- Rode este arquivo inteiro no Supabase: Dashboard > SQL Editor > New query.
-- Cria as tabelas do portfólio, as regras de acesso (todo mundo lê, só o
-- admin escreve), o bucket de imagens e preenche com o conteúdo atual do site.

-- ---------------------------------------------------------------------------
-- Admin
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- Tabelas de conteúdo
-- ---------------------------------------------------------------------------
create table if not exists public.profile (
  id int primary key default 1 check (id = 1),
  name text not null default '',
  headline text not null default '',
  bio text not null default '',
  avatar_url text,
  whatsapp_url text,
  github_url text,
  linkedin_url text,
  email text
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  course text not null,
  institution text not null,
  period text not null default '',
  location text not null default '',
  description text not null default '',
  sort_order int not null default 0
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  progress int not null default 0 check (progress between 0 and 100),
  sort_order int not null default 0
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  tags text[] not null default '{}',
  github_url text,
  demo_url text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS: leitura pública, escrita só para admin
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array['profile', 'education', 'skills', 'projects'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format(
      'create policy "public read" on public.%I for select using (true)', t);
    execute format(
      'create policy "admin write" on public.%I for all to authenticated
         using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Permissões da Data API (necessárias quando "Automatically expose new
-- tables" está desligado). Quem pode ver/alterar cada linha continua sendo
-- decidido pelas políticas RLS acima.
grant select on public.profile, public.education, public.skills, public.projects
  to anon, authenticated;
grant insert, update, delete on public.profile, public.education, public.skills, public.projects
  to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage: bucket público para foto de perfil e imagens dos projetos
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "portfolio public read" on storage.objects;
drop policy if exists "portfolio admin insert" on storage.objects;
drop policy if exists "portfolio admin update" on storage.objects;
drop policy if exists "portfolio admin delete" on storage.objects;

create policy "portfolio public read" on storage.objects
  for select using (bucket_id = 'portfolio');
create policy "portfolio admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'portfolio' and public.is_admin());
create policy "portfolio admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'portfolio' and public.is_admin());
create policy "portfolio admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'portfolio' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Conteúdo inicial (o que estava fixo no código)
-- ---------------------------------------------------------------------------
insert into public.profile (id, name, headline, bio, avatar_url, whatsapp_url, github_url, linkedin_url, email)
values (
  1,
  'Renan Da Silva Rubio',
  'Desenvolvedor em Formação',
  'Estudante de Análise e Desenvolvimento de Sistemas na UNIP, apaixonado por transformar lógica em interfaces modernas. Atualmente focado em dominar o ecossistema React, TypeScript e C#, construindo projetos práticos para consolidar minha base técnica e buscando minha primeira oportunidade de estágio para evoluir em um ambiente profissional.',
  '/img/perfil.jpeg',
  'https://wa.me/5515981512669',
  'https://github.com/Renan-Silva235',
  'https://linkedin.com/in/renan-rubio-017290222',
  'renan.rubio95@gmail.com'
)
on conflict (id) do nothing;

insert into public.education (course, institution, period, location, description, sort_order)
select * from (values (
  'Análise e Desenvolvimento de Sistemas',
  'UNIP — Universidade Paulista',
  'Previsão de Formatura: 2026',
  'Sorocaba, SP',
  'Foco em engenharia de software, estrutura de dados e desenvolvimento fullstack. Utilizo a base acadêmica para aplicar padrões de projeto e arquitetura limpa em soluções práticas, buscando constantemente a transição entre a teoria e as demandas reais do mercado de tecnologia.',
  0
)) v
where not exists (select 1 from public.education);

insert into public.skills (name, progress, sort_order)
select * from (values
  ('JavaScript / TypeScript', 35, 0),
  ('React.js', 35, 1),
  ('Node.js / Express', 55, 2),
  ('SQL (MySQL)', 60, 3),
  ('Linux (Ubuntu)', 75, 4),
  ('PYTHON', 80, 5),
  ('C#', 30, 6),
  ('MongoDB', 30, 7)
) v
where not exists (select 1 from public.skills);

insert into public.projects (title, description, tags, github_url, demo_url, sort_order)
select * from (values
  ('Gerenciador de Contas Bancárias',
   'Sistema de gerenciamento de contas bancárias com Python e interface gráfica feita no Tkinter.',
   array['PYTHON', 'TKINTER', 'SQLITE'],
   'https://github.com/Renan-Silva235/gerenciador_de_contas_bancarias.git',
   null::text, 0),
  ('Gerador de Senhas Personalizáveis',
   'Gerador de senhas personalizável, desenvolvido com HTML, CSS e JavaScript.',
   array['HTML', 'CSS', 'JS'],
   'https://github.com/Renan-Silva235/Password-Generator.git',
   'https://gerador-de-senhas-eight-lilac.vercel.app/', 1),
  ('EscolarApp',
   'Crud simples de um app que gerencia alunos e funcionários de uma escola.',
   array['Java/Spring boot', 'TypesScript + React', 'Tailwind Css'],
   'https://github.com/Renan-Silva235/Frontend_EscolarApp.git',
   'https://escolar-app.vercel.app', 2)
) v
where not exists (select 1 from public.projects);
