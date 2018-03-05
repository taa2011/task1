import React from 'react';
import { AppRegistry } from 'react-native';
import StackNavigator from './src/App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'remote-redux-devtools';

import reducer from './src/reducers';



let store = createStore (reducer, composeWithDevTools(applyMiddleware(thunk)));

const RNRedux = () => (
  <Provider store={store}>
    <StackNavigator />
  </Provider>
)


AppRegistry.registerComponent('tsk', () => RNRedux);
