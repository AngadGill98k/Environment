import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { store } from './redux/store';
import Login from './components/login/Login';
import Admin from './components/Admin/Admin';
import Forums from './components/Forums/Forums';
import Content from './components/Content/Content';
import User from './components/User/User';
import Verify from './components/Admin/Verify';
const router=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/home",
    element:<App/>
  },
  {
    path:"/admin",
    element:<Admin/>
  },
  {
    path:"/forums",
    element:<Forums/>
  },
  {
    path:"/content",
    element:<Content/>
  },
  {
    path:"/user",
    element:<User/>
  },
  {
    path:"/verify",
    element:<Verify/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
