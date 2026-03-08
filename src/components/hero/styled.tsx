// Troque TUDO no seu styled.tsx por isso aqui:
import { styled, keyframes } from '@mui/material';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

export const BlinkingCursor = styled('span')({
  color: '#fff !important', // O !important força a cor se o Typography estiver bloqueando
  fontWeight: 'bold',
  marginLeft: '4px',
  display: 'inline-block', // Sem isso o navegador às vezes ignora o tamanho/animação
  animation: `${blink} 1s step-end infinite`,
});
