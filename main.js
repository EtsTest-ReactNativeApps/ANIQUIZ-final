import Expo from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import App from './src/App';

//main component/class
class Aniquiz extends React.Component {

  render() {
  	//create redux store and apply reducers, redux-persist
    const store = createStore(reducers,{},compose(applyMiddleware(ReduxThunk),autoRehydrate()));

    //apply AsyncStorage and apply redux-persist to main
    persistStore(store, { storage: AsyncStorage, whitelist:['main']});
    
    //return JSX with Provider component wrapping App component
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

//register main component/class as root component
Expo.registerRootComponent(Aniquiz);
