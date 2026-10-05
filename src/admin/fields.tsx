import { useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadImage } from '../lib/supabase';

export type FieldType =
  | 'text'
  | 'multiline'
  | 'url'
  | 'email'
  | 'percent'
  | 'tags'
  | 'image';

export interface FieldDef {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  // Pasta do Storage onde imagens deste campo são salvas
  folder?: string;
}

export type FormValues = Record<string, unknown>;

interface FieldInputProps {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
  onError: (message: string) => void;
}

export function FieldInput({
  field,
  value,
  onChange,
  onError,
}: FieldInputProps) {
  switch (field.type) {
    case 'percent':
      return (
        <Box>
          <Typography gutterBottom>
            {field.label}: {Number(value ?? 0)}%
          </Typography>
          <Slider
            value={Number(value ?? 0)}
            onChange={(_e, v) => onChange(v as number)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </Box>
      );

    case 'tags':
      return (
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={(value as string[] | undefined) ?? []}
          onChange={(_e, v) => onChange(v)}
          renderValue={(tags, getItemProps) =>
            tags.map((tag, index) => {
              const { key, ...itemProps } = getItemProps({ index });
              return <Chip key={key} label={tag} size="small" {...itemProps} />;
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={field.label}
              helperText="Digite e aperte Enter para adicionar"
            />
          )}
        />
      );

    case 'image':
      return (
        <ImageInput
          field={field}
          value={value as string | null}
          onChange={onChange}
          onError={onError}
        />
      );

    default:
      return (
        <TextField
          label={field.label}
          fullWidth
          required={field.required}
          type={
            field.type === 'email'
              ? 'email'
              : field.type === 'url'
                ? 'url'
                : 'text'
          }
          multiline={field.type === 'multiline'}
          minRows={field.type === 'multiline' ? 4 : undefined}
          value={(value as string | null) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

interface ImageInputProps {
  field: FieldDef;
  value: string | null;
  onChange: (value: string | null) => void;
  onError: (message: string) => void;
}

function ImageInput({ field, value, onChange, onError }: ImageInputProps) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      onChange(await uploadImage(file, field.folder ?? 'misc'));
    } catch (err) {
      onError(`Erro ao enviar imagem: ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <Typography gutterBottom>{field.label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={value ?? undefined}
          variant="rounded"
          sx={{ width: 96, height: 96 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            component="label"
            variant="outlined"
            startIcon={
              uploading ? <CircularProgress size={18} /> : <CloudUploadIcon />
            }
            disabled={uploading}
          >
            {uploading ? 'Enviando...' : 'Escolher imagem'}
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </Button>
          {value && (
            <Button size="small" color="error" onClick={() => onChange(null)}>
              Remover imagem
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const NULLABLE_TYPES: FieldType[] = ['url', 'email', 'image'];

// Mantém só os campos do formulário e salva links vazios como null
export function cleanValues(values: FormValues, fields: FieldDef[]) {
  return Object.fromEntries(
    fields.map((f) => {
      const v = values[f.name];
      const nullable = NULLABLE_TYPES.includes(f.type ?? 'text');
      return [f.name, nullable && v === '' ? null : v];
    })
  );
}
