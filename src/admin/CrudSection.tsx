import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { supabase } from '../lib/supabase';
import { FieldInput, cleanValues } from './fields';
import type { FieldDef, FormValues } from './fields';

interface Row {
  id: string;
  sort_order: number;
}

interface CrudSectionProps<T extends Row> {
  table: string;
  itemLabel: string;
  fields: FieldDef[];
  emptyItem: FormValues;
  primary: (item: T) => string;
  secondary?: (item: T) => string;
  notify: (message: string, severity?: 'success' | 'error') => void;
}

// Lista + criação/edição/exclusão/ordenação de uma tabela do Supabase
export default function CrudSection<T extends Row>({
  table,
  itemLabel,
  fields,
  emptyItem,
  primary,
  secondary,
  notify,
}: CrudSectionProps<T>) {
  const [items, setItems] = useState<T[] | null>(null);
  const [editing, setEditing] = useState<FormValues | null>(null);
  const [toDelete, setToDelete] = useState<T | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('sort_order');
    if (error) notify(error.message, 'error');
    setItems((data as T[]) ?? []);
  }, [table, notify]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const values = cleanValues(editing, fields);
    const { error } = editing.id
      ? await supabase.from(table).update(values).eq('id', editing.id)
      : await supabase.from(table).insert({
          ...values,
          sort_order:
            Math.max(-1, ...(items ?? []).map((i) => i.sort_order)) + 1,
        });
    setSaving(false);
    if (error) {
      notify(`Erro ao salvar: ${error.message}`, 'error');
      return;
    }
    notify(`${itemLabel} salvo!`);
    setEditing(null);
    load();
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    const { error } = await supabase.from(table).delete().eq('id', toDelete.id);
    setToDelete(null);
    if (error) {
      notify(`Erro ao excluir: ${error.message}`, 'error');
      return;
    }
    notify(`${itemLabel} excluído.`);
    load();
  };

  // Troca a posição de um item com o vizinho
  const move = async (index: number, direction: -1 | 1) => {
    if (!items || !items[index + direction]) return;
    const reordered = [...items];
    [reordered[index], reordered[index + direction]] = [
      reordered[index + direction],
      reordered[index],
    ];
    // Renumera a lista inteira (0, 1, 2...) e salva só o que mudou
    const results = await Promise.all(
      reordered
        .map((item, i) => ({ item, i }))
        .filter(({ item, i }) => item.sort_order !== i)
        .map(({ item, i }) =>
          supabase.from(table).update({ sort_order: i }).eq('id', item.id)
        )
    );
    const failed = results.find((r) => r.error);
    if (failed?.error) notify(failed.error.message, 'error');
    load();
  };

  if (!items) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setEditing({ ...emptyItem })}
        >
          Adicionar
        </Button>
      </Box>

      <Paper variant="outlined">
        {items.length === 0 ? (
          <Typography sx={{ p: 3, color: 'text.secondary' }}>
            Nada cadastrado ainda.
          </Typography>
        ) : (
          <List disablePadding>
            {items.map((item, index) => (
              <ListItem
                key={item.id}
                divider={index < items.length - 1}
                secondaryAction={
                  <Stack direction="row">
                    <Tooltip title="Subir">
                      <span>
                        <IconButton
                          disabled={index === 0}
                          onClick={() => move(index, -1)}
                        >
                          <ArrowUpwardIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Descer">
                      <span>
                        <IconButton
                          disabled={index === items.length - 1}
                          onClick={() => move(index, 1)}
                        >
                          <ArrowDownwardIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton
                        onClick={() =>
                          setEditing({ ...(item as unknown as FormValues) })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        color="error"
                        onClick={() => setToDelete(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
                sx={{ pr: 24 }}
              >
                <ListItemText
                  primary={primary(item)}
                  secondary={secondary?.(item)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Dialog
        open={editing !== null}
        onClose={() => setEditing(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editing?.id ? `Editar ${itemLabel}` : `Novo ${itemLabel}`}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ pt: 1 }}>
            {editing &&
              fields.map((field) => (
                <FieldInput
                  key={field.name}
                  field={field}
                  value={editing[field.name]}
                  onChange={(v) =>
                    setEditing((prev) => prev && { ...prev, [field.name]: v })
                  }
                  onError={(msg) => notify(msg, 'error')}
                />
              ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={
              saving || fields.some((f) => f.required && !editing?.[f.name])
            }
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={toDelete !== null} onClose={() => setToDelete(null)}>
        <DialogTitle>Excluir {itemLabel}?</DialogTitle>
        <DialogContent>
          <Typography>
            "{toDelete && primary(toDelete)}" será removido do portfólio.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setToDelete(null)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
