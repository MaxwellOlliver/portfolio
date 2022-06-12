import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    outline: none;
    padding: 0;
    border: none;
    box-sizing: border-box;
  }

  html, body, input, button, textarea {
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    font-size: 1rem;
    color: #fff;
  }

  html,body  {
    background-color: #000;
  }

  button {
    cursor: pointer;
  }

  *::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  *::-webkit-scrollbar-track {
    width: 20px;
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    width: 18px;
    background-clip: content-box;
    background-color: ${(props) => `#33333366`};
  }
`;
