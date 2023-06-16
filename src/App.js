import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import reset from './Shared/reset.css';
import Router from './Router';
import theme from './Shared/theme';
import {getToken} from './Shared/localStorage';

function App() {
  const token = getToken();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrap>
        <Router />
      </Wrap>
    </ThemeProvider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
${reset}; // Reset CSS

body{
  font-family:${({theme}) => theme.fontFamily.default};
  font-size:14px;
  width: ${window.innerWidth}px;
}
`;

const Wrap = styled.div`
  display: flex;
`;
