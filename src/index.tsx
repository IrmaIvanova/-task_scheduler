import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Layout } from './components/Layout/Layout'
import './index.css'
import { AppContextProvider, } from './context/AppContext/AppContextProvider'
import  {store}  from './redux/store'
import { Provider } from 'react-redux'

console.log("store", store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContextProvider >


        <Layout />


      </AppContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);