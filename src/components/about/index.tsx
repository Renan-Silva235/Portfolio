import { Box, Typography, Paper, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as color from '../../config/colors';
import type { Education } from '../../types';

interface AboutProps {
  education: Education[];
}

export default function About({ education }: AboutProps) {
  return (
    <Box sx={{ py: 10, px: 2, backgroundColor: 'transparent' }}>
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            mb: 5,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            background: color.linearGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          <SchoolIcon sx={{ color: '#5468FF', fontSize: 40 }} />
          Formação Acadêmica
        </Typography>

        <Stack spacing={4}>
          {education.map((item) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '24px',
                border: '1px solid rgba(84, 104, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  backgroundColor: '#4FD1C5',
                },
              }}
            >
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ color: '#fff', fontWeight: 800, mb: 1 }}
                  >
                    {item.course}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: '#4FD1C5', fontWeight: 600 }}
                  >
                    {item.institution}
                  </Typography>
                </Box>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: '#a0a0a0',
                    }}
                  >
                    <CalendarMonthIcon sx={{ fontSize: 20 }} />
                    <Typography>{item.period}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: '#a0a0a0',
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: 20 }} />
                    <Typography>{item.location}</Typography>
                  </Box>
                </Stack>

                <Typography
                  sx={{ color: '#d0d0d0', lineHeight: 1.8, fontSize: '1.1rem' }}
                >
                  {item.description}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
