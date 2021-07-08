import React from 'react';
import './App.css';
import MainRoutes from './routes/mainRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
       <MainRoutes />
       <ToastContainer />
    </div>
  );
}

export default App;
