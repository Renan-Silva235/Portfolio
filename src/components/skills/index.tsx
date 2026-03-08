import { Box, Typography, LinearProgress, Stack, Paper } from '@mui/material';
import * as color from '../../config/colors';

export default function Skills() {
  const skills = [
    { name: 'JavaScript / TypeScript', progress: 35 },
    { name: 'React.js', progress: 35 },
    { name: 'Node.js / Express', progress: 55 },
    { name: 'SQL (MySQL)', progress: 60 },
    { name: 'Linux (Ubuntu)', progress: 75 },
    { name: 'PYTHON', progress: 80 },
    { name: 'C#', progress: 30 },
    { name: 'MongoDB', progress: 30 },
  ];

  return (
    <Box sx={{ py: 10, px: 2, backgroundColor: 'transparent' }}>
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            mb: 5,
            background: color.linearGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Tecnologias & Skills
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '24px',
            border: '1px solid rgba(84, 104, 255, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack spacing={4}>
            {skills.map((skill) => (
              <Box key={skill.name}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                    {skill.name}
                  </Typography>
                  <Typography sx={{ color: '#4FD1C5', fontWeight: 800 }}>
                    {skill.progress}%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={skill.progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: color.linearGradient,
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
