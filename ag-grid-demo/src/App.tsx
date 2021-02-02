import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Blotter from './components/Blotter';
import store from './reducers/orderReducer'

function App() {
  return (
    <div className="App">
        <Provider store={store} >
          <Blotter />
        </Provider>
        
    </div>
  );
}

export default App;
