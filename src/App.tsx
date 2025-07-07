import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
};

export default App;
