import { Box, CircularProgress, Typography } from '@mui/material';
import ResponsiveAppBar from '../components/header';
import Hero from '../components/hero';
import About from '../components/about';
import Skills from '../components/skills';
import Projects from '../components/projects';
import Contact from '../components/contact';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function PortfolioPage() {
  const { data, error } = usePortfolioData();

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', mt: 20 }}>
        <Typography color="error">
          Não foi possível carregar o portfólio: {error}
        </Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 30 }}>
        <CircularProgress sx={{ color: '#4FD1C5' }} />
      </Box>
    );
  }

  return (
    <>
      <ResponsiveAppBar />

      <div id="home">
        <Hero profile={data.profile} />
      </div>
      <div id="sobre">
        <About education={data.education} />
      </div>
      <div id="skills">
        <Skills skills={data.skills} />
      </div>
      <div id="projetos">
        <Projects projects={data.projects} />
      </div>
      <div id="contato">
        <Contact />
      </div>
    </>
  );
}
