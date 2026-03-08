import { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';

export default createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  /* Cor escura principal do protótipo */
  background-color: #0a0d14;

  /* O efeito de "luz" suave ao fundo */
  background-image: ${colors.radialGradient};

  background-attachment: fixed;
  color: white;
  font-family: 'Inter', sans-serif; /* Fonte comum para portfólios modernos */
  min-height: 100vh;
}
`;
