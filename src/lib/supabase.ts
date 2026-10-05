import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error(
    'Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env'
  );
}

export const supabase = createClient(
  url ?? 'http://localhost',
  anonKey ?? 'missing-key'
);

export const STORAGE_BUCKET = 'portfolio';

// Envia uma imagem para o Storage e devolve a URL pública dela.
export async function uploadImage(file: File, folder: string) {
  const ext = file.name.split('.').pop();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600' });
  if (error) throw error;
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data
    .publicUrl;
}
