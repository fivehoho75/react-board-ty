import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import configureStore from 'store/configureStore';

const store = configureStore();

const Root: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default Root;
