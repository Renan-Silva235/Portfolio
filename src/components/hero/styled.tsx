import { styled, keyframes } from '@mui/material';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

export const BlinkingCursor = styled('span')({
  color: '#fff !important', 
  fontWeight: 'bold',
  marginLeft: '4px',
  display: 'inline-block', 
  animation: `${blink} 1s step-end infinite`,
});
