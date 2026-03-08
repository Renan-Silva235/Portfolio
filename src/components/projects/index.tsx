import { Box, Typography, Paper, Stack, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import * as color from '../../config/colors';

export default function Projects() {
  const projects = [
    {
      title: 'Gerenciador de Contas Bancárias',
      description:
        'Sistema de gerenciamento de contas bancárias com Python e interface gráfica feita no Tkinter.',
      tags: ['PYTHON', 'TKINTER', 'SQLITE'],
      github:
        'https://github.com/Renan-Silva235/gerenciador_de_contas_bancarias.git',
      demo: '#',
    },
    {
      title: 'Gerador de Senhas',
      description:
        'Gerador de senhas personalizável, desenvolvido com HTML, CSS e JavaScript.',
      tags: ['HTML', 'CSS', 'JS'],
      github: 'https://github.com/Renan-Silva235/Password-Generator.git',
      demo: '#',
    },
    {
      title: 'Portfólio',
      description: 'Este projeto desenvolvido com React e Material UI.',
      tags: ['React', 'MUI', 'TS'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Portfólio',
      description: 'Este projeto desenvolvido com React e Material UI.',
      tags: ['React', 'MUI', 'TS'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Portfólio',
      description: 'Este projeto desenvolvido com React e Material UI.',
      tags: ['React', 'MUI', 'TS'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Portfólio',
      description: 'Este projeto desenvolvido com React e Material UI.',
      tags: ['React', 'MUI', 'TS'],
      github: '#',
      demo: '#',
    },
  ];

  return (
    <Box sx={{ py: 10, px: 2, backgroundColor: 'transparent' }}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Título com o Gradiente Correto */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            mb: 6,
            textAlign: 'center',
            background: color.linearGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Projetos em Destaque
        </Typography>

        {/* Usando BOX com FLEX em vez de GRID para matar os erros de TypeScript */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {projects.map((proj, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                width: {
                  xs: '100%',
                  sm: 'calc(50% - 32px)',
                  md: 'calc(33.3% - 32px)',
                },
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '24px',
                border: '1px solid rgba(84, 104, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.4s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  borderColor: '#4FD1C5',
                },
              }}
            >
              <Stack spacing={2} sx={{ height: '100%' }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ color: '#fff', fontWeight: 800, mb: 1.5 }}
                  >
                    {proj.title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {proj.tags.map((tag) => (
                      <Typography
                        key={tag}
                        sx={{
                          fontSize: '0.75rem',
                          color: '#4FD1C5',
                          backgroundColor: 'rgba(79, 209, 197, 0.1)',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '50px',
                          fontWeight: 'bold',
                        }}
                      >
                        {tag}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                <Typography sx={{ color: '#a0a0a0', flexGrow: 1 }}>
                  {proj.description}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    href={proj.github}
                    sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
                  >
                    GitHub
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ background: color.linearGradient }}
                  >
                    Demo
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
