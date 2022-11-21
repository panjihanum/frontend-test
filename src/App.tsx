import React from 'react';
import styled from 'styled-components';
import './App.css';
import Atoms from './components/atoms';
import Home from './pages/Home';

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

function App() {
  return (
    <div className="App">
      <Atoms.Background />
      <ContentWrapper>
        <Home />
      </ContentWrapper>
    </div>
  );
}

export default App;
