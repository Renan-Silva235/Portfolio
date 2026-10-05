import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Paper, Stack } from '@mui/material';
import { supabase } from '../lib/supabase';
import { FieldInput, cleanValues } from './fields';
import type { FieldDef, FormValues } from './fields';

const fields: FieldDef[] = [
  {
    name: 'avatar_url',
    label: 'Foto de perfil',
    type: 'image',
    folder: 'avatar',
  },
  { name: 'name', label: 'Nome', required: true },
  { name: 'headline', label: 'Título (ex: Desenvolvedor Fullstack)' },
  { name: 'bio', label: 'Apresentação', type: 'multiline' },
  { name: 'github_url', label: 'GitHub', type: 'url' },
  { name: 'linkedin_url', label: 'LinkedIn', type: 'url' },
  { name: 'whatsapp_url', label: 'WhatsApp (link wa.me)', type: 'url' },
  { name: 'email', label: 'E-mail de contato', type: 'email' },
];

interface ProfileEditorProps {
  notify: (message: string, severity?: 'success' | 'error') => void;
}

export default function ProfileEditor({ notify }: ProfileEditorProps) {
  const [values, setValues] = useState<FormValues | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('profile')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) notify(error.message, 'error');
        setValues(data ?? {});
      });
  }, [notify]);

  const handleSave = async () => {
    if (!values) return;
    setSaving(true);
    const { error } = await supabase
      .from('profile')
      .upsert({ id: 1, ...cleanValues(values, fields) });
    setSaving(false);
    if (error) notify(`Erro ao salvar: ${error.message}`, 'error');
    else notify('Perfil salvo!');
  };

  if (!values) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack spacing={3}>
        {fields.map((field) => (
          <FieldInput
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={(v) =>
              setValues((prev) => prev && { ...prev, [field.name]: v })
            }
            onError={(msg) => notify(msg, 'error')}
          />
        ))}
        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
            disabled={saving || !values.name}
          >
            {saving ? 'Salvando...' : 'Salvar perfil'}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
