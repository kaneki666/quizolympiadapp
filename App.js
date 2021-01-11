import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Block, GalioProvider} from 'galio-framework';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import axios from 'axios';
import AuthMenu from './navigation/AuthMenu';
import HomeMenu from './navigation/Screens';
import {nowTheme} from './constants';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {URL} from './constants/Api';

const App = () => {
  const stateAuth = useSelector((state) => state.authState);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      <GalioProvider theme={nowTheme}>
        <Block flex>
          {stateAuth.isSigned ? (
            <>
              <HomeMenu />
            </>
          ) : (
            <>
              <AuthMenu />
            </>
          )}
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  const client = new ApolloClient({
    uri: `${URL}/graphql`,
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default AppWrapper;
