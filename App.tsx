import 'react-native-gesture-handler';
import React from 'react';
import AppContainer from 'routes';
import ContextProvider from 'context';

const App = () => {
  return (
    <ContextProvider>
      <AppContainer />
    </ContextProvider>
  );
};

export default App;
