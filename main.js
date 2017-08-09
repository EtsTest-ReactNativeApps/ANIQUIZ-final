import Expo from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import App from './src/App';

class Aniquiz extends React.Component {

  render() {
    const store = createStore(reducers,{},compose(applyMiddleware(ReduxThunk),autoRehydrate()));

    persistStore(store, { storage: AsyncStorage, whitelist:['app']});
    
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

Expo.registerRootComponent(Aniquiz);
