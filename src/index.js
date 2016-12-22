import React from 'react';
import { Provider } from 'react-redux';
import { NavigationProvider } from '@exponent/ex-navigation';

import './utils/services';
import AppContainer from './containers/AppContainer';
import store from './store';
import Router from './navigation/Router';

export default (props) => (
  <Provider store={store}>
    <NavigationProvider router={Router}>
      <AppContainer {...props} />
    </NavigationProvider>
  </Provider>
);
