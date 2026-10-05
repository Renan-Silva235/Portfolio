import { useCallback, useState } from 'react';
import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Snackbar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { supabase } from '../lib/supabase';
import type { Education, Project, Skill } from '../types';
import AdminTheme from './theme';
import CrudSection from './CrudSection';
import ProfileEditor from './ProfileEditor';
import type { FieldDef } from './fields';

const educationFields: FieldDef[] = [
  { name: 'course', label: 'Curso', required: true },
  { name: 'institution', label: 'Instituição', required: true },
  { name: 'period', label: 'Período (ex: Previsão de Formatura: 2026)' },
  { name: 'location', label: 'Local' },
  { name: 'description', label: 'Descrição', type: 'multiline' },
];

const skillFields: FieldDef[] = [
  { name: 'name', label: 'Tecnologia', required: true },
  { name: 'progress', label: 'Nível', type: 'percent' },
];

const projectFields: FieldDef[] = [
  { name: 'title', label: 'Título', required: true },
  { name: 'description', label: 'Descrição', type: 'multiline' },
  { name: 'tags', label: 'Tecnologias', type: 'tags' },
  { name: 'github_url', label: 'Link do repositório', type: 'url' },
  { name: 'demo_url', label: 'Link do deploy (demonstração)', type: 'url' },
  {
    name: 'image_url',
    label: 'Imagem do card (opcional)',
    type: 'image',
    folder: 'projects',
  },
];

const tabs = ['Perfil', 'Formação', 'Skills', 'Projetos'];

export default function AdminPanel() {
  const [tab, setTab] = useState(0);
  const [toast, setToast] = useState<{
    message: string;
    severity: 'success' | 'error';
  } | null>(null);

  const notify = useCallback(
    (message: string, severity: 'success' | 'error' = 'success') =>
      setToast({ message, severity }),
    []
  );

  return (
    <AdminTheme>
      <AppBar position="sticky" elevation={0} color="default">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800 }}>
            Painel Administrativo
          </Typography>
          <Button href="/" target="_blank" startIcon={<OpenInNewIcon />}>
            Ver site
          </Button>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => supabase.auth.signOut()}
          >
            Sair
          </Button>
        </Toolbar>
        <Tabs
          value={tab}
          onChange={(_e, v) => setTab(v)}
          variant="scrollable"
          sx={{ px: 2 }}
        >
          {tabs.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {tab === 0 && <ProfileEditor notify={notify} />}
        {tab === 1 && (
          <CrudSection<Education>
            table="education"
            itemLabel="formação"
            fields={educationFields}
            emptyItem={{
              course: '',
              institution: '',
              period: '',
              location: '',
              description: '',
            }}
            primary={(e) => e.course}
            secondary={(e) => `${e.institution} · ${e.period}`}
            notify={notify}
          />
        )}
        {tab === 2 && (
          <CrudSection<Skill>
            table="skills"
            itemLabel="skill"
            fields={skillFields}
            emptyItem={{ name: '', progress: 50 }}
            primary={(s) => s.name}
            secondary={(s) => `${s.progress}%`}
            notify={notify}
          />
        )}
        {tab === 3 && (
          <CrudSection<Project>
            table="projects"
            itemLabel="projeto"
            fields={projectFields}
            emptyItem={{
              title: '',
              description: '',
              tags: [],
              github_url: '',
              demo_url: '',
              image_url: null,
            }}
            primary={(p) => p.title}
            secondary={(p) => p.tags.join(', ')}
            notify={notify}
          />
        )}
      </Container>

      <Snackbar
        open={toast !== null}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={toast?.severity ?? 'success'}
          variant="filled"
          onClose={() => setToast(null)}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </AdminTheme>
  );
}
