import {
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  IconButton,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { BlinkingCursor } from './styled';
import * as colors from '../../config/colors';

export default function Hero() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        mt: 15,
        px: 2,
        minHeight: '80vh',
      }}
    >
      <Box
        sx={{
          p: '4px',
          background: colors.linearGradient,
          borderRadius: '50%',
          mb: 6,
        }}
      >
        <Avatar
          src="/img/perfil.jpeg"
          sx={{ width: 160, height: 160, border: '6px solid #0a0d14' }}
        />
      </Box>

      <Typography
        variant="overline"
        sx={{ color: '#4FD1C5', fontWeight: 'bold', letterSpacing: 3, mb: 1 }}
      >
        OLÁ, EU SOU
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          mb: 2,
          background: colors.linearGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '2.5rem', md: '3.75rem' },
        }}
      >
        Renan Da Silva Rubio
      </Typography>

      <Typography
        variant="h5"
        sx={{ color: '#e0e0e0', mb: 5, fontWeight: 300 }}
      >
        Desenvolvedor em Formação <BlinkingCursor>|</BlinkingCursor>
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: '#a0a0a0',
          maxWidth: '700px',
          mb: 8,
          lineHeight: 1.8,
          fontSize: '1.1rem',
        }}
      >
        Estudante de Análise e Desenvolvimento de Sistemas na UNIP, apaixonado
        por transformar lógica em interfaces modernas. Atualmente focado em
        dominar o ecossistema React, TypeScript e C#, construindo projetos
        práticos para consolidar minha base técnica e buscando minha primeira
        oportunidade de estágio para evoluir em um ambiente profissional.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 8 }}>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            background: colors.linearGradient,
            borderRadius: '30px',
            px: 5,
            py: 1.8,
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              transform: 'scale(1.05)', // Aumenta 5% no hover
              boxShadow: '0 6px 20px rgba(84, 104, 255, 0.5)',
            },
          }}
        >
          Ver Projetos
        </Button>

        <Button
          variant="outlined"
          startIcon={<WhatsAppIcon />}
          href="https://wa.me/5515981512669"
          sx={{
            color: '#fff',
            borderColor: '#5468FF',
            borderRadius: '30px',
            px: 5,
            textTransform: 'none',
            borderWidth: '2px',
            '&:hover': {
              borderColor: '#4FD1C5',
              borderWidth: '2px',
              transform: 'scale(1.05)', 
              background: 'rgba(79, 209, 197, 0.05)',
            },
          }}
        >
          Entre em Contato
        </Button>
      </Stack>

      <Stack direction="row" spacing={3}>
        <IconButton
          href="https://github.com/Renan-Silva235"
          target="_blank"
          sx={{
            color: '#4FD1C5',
            border: '1px solid rgba(79, 209, 197, 0.3)',
            '&:hover': {
              background: 'rgba(79, 209, 197, 0.1)',
              transform: 'translateY(-3px)',
            },
          }}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>

        <IconButton
          href="https://linkedin.com/in/renan-rubio-017290222"
          target="_blank"
          sx={{
            color: '#4FD1C5',
            border: '1px solid rgba(79, 209, 197, 0.3)',
            '&:hover': {
              background: 'rgba(79, 209, 197, 0.1)',
              transform: 'translateY(-3px)',
            },
          }}
        >
          <LinkedInIcon fontSize="large" />
        </IconButton>

        <IconButton
          href="mailto:renan.rubio95@gmail.com"
          sx={{
            color: '#4FD1C5',
            border: '1px solid rgba(79, 209, 197, 0.3)',
            '&:hover': {
              background: 'rgba(79, 209, 197, 0.1)',
              transform: 'translateY(-3px)',
            },
          }}
        >
          <EmailIcon fontSize="large" />
        </IconButton>
      </Stack>
    </Box>
  );
}
