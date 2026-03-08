import { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';

export default createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0a0d14;

  background-image: ${colors.radialGradient};

  background-attachment: fixed;
  color: white;
  font-family: 'Inter', sans-serif; /* Fonte comum para portfólios modernos */
  min-height: 100vh;
}
`;
