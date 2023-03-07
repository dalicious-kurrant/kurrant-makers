import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import reset from './Shared/reset.css';
import Router from './Router';
import theme from './Shared/theme';
import {getToken} from './Shared/localStorage';

function App() {
  const token = getToken();

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Wrap>
          <Router />
        </Wrap>
      </ThemeProvider>
    </Container>
  );
}

export default App;

const Container = styled.div``;

const GlobalStyle = createGlobalStyle`
${reset}; // Reset CSS

body{
  font-family:${({theme}) => theme.fontFamily.default};
  font-size:14px;
}
`;

const Wrap = styled.div`
  display: flex;
`;
