import React, { useRef, useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  // Estado para armazenar o token do reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validação do Captcha: Se não tiver token, não envia
    if (!captchaToken) {
      alert('Por favor, marque a caixa "Eu não sou um robô".');
      return;
    }

    if (form.current) {
      const data = new FormData(form.current);
      const emailValue = data.get('user_email') as string;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailValue)) {
        alert('Por favor, insira um e-mail válido!');
        return;
      }

      emailjs
        .sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_PUBLIC_KEY
        )
        .then(
          () => {
            alert('Mensagem enviada com sucesso!');
            form.current?.reset();
            setCaptchaToken(null); // Reseta o captcha após o envio
          },
          (error) => {
            alert('Erro ao enviar: ' + error.text);
          }
        );
    }
  };

  return (
    <Box
      id="contato"
      sx={{ py: 10, backgroundColor: '#0a0d14', color: '#fff' }}
    >
      <Container maxWidth="md">
        <Typography
          variant="body2"
          sx={{
            color: '#4FD1C5',
            textAlign: 'center',
            mb: 1,
            fontWeight: 'bold',
          }}
        >
          // Vamos conversar
        </Typography>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: '900',
            mb: 5,
            color: '#42a5f5',
          }}
        >
          Entre em Contato
        </Typography>

        <Box
          component="form"
          ref={form}
          onSubmit={sendEmail}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Grid container spacing={3}>
            {/* Nome */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Nome</Typography>
              <TextField
                fullWidth
                name="user_name"
                placeholder="Seu nome"
                required
                sx={{
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                }}
              />
            </Grid>

            {/* E-mail */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ mb: 1, fontWeight: 'bold' }}>E-mail</Typography>
              <TextField
                fullWidth
                name="user_email"
                type="email"
                placeholder="seu@email.com"
                required
                sx={{
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                }}
              />
            </Grid>

            {/* Assunto */}
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
                Assunto
              </Typography>
              <TextField
                fullWidth
                name="subject"
                placeholder="Qual o assunto?"
                required
                sx={{
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                }}
              />
            </Grid>

            {/* Mensagem */}
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
                Mensagem
              </Typography>
              <TextField
                fullWidth
                name="message"
                placeholder="Escreva sua mensagem aqui..."
                multiline
                rows={4}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                }}
              />
            </Grid>

            {/* Google reCAPTCHA */}
            <Grid
              size={{ xs: 12 }}
              sx={{ display: 'flex', justifyContent: 'center', my: 1 }}
            >
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                theme="dark"
              />
            </Grid>

            {/* Botão Enviar */}
            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  py: 1.8,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderRadius: '8px',
                  background:
                    'linear-gradient(90deg, #42a5f5 0%, #4FD1C5 100%)',
                  '&:hover': { opacity: 0.9 },
                }}
              >
                Enviar Mensagem
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactForm;
