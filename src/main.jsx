import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from './layouts/RootLayout.jsx';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { UserContextProvider} from '../context/UserContextProvider.jsx'
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import UnprotectedRoutes from './components/UnprotectedRoutes.jsx';
import { Provider } from 'react-redux';
import store from '../store.js';
import CreateMenuItem from './pages/CreateMenuItem.jsx';
import MenuDetails from './components/MenuDetails.jsx';
import Cart from './components/Cart.jsx';
import CartPage from './pages/CartPage.jsx';
import Checkout from './pages/Checkout.jsx';
import Success from './pages/Success.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import AdminProtectedRoutes from './components/AdminProtectedRoutes.jsx';
import AdminOrdersPage from './pages/AdminOrdersPage.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {
        index:true,
        element:<Homepage/>
      },
      { 
        element:<UnprotectedRoutes/>,
        children:[
          {
            path:'/login',
            element:<Login/>
          },
          {
            path:'/register',
            element:<Register/>
          },
        
        ]
      },
      
      //protected
      {
        element:<ProtectedRoutes/>,
        children:[
          {
            path:'/dashboard',
            element:<Dashboard/>
          },
        
          {
            path:'/cart',
            element:<CartPage/>
          },
          {
            path:'/checkout',
            element:<Checkout/>
          },
          {
            path:'/success',
            element:<Success/>
          },
          {
            path:'/orderhistory',
            element:<OrderHistory/>
          },
        ]
      },

      {
        element:<AdminProtectedRoutes/>,
        children:[
          {
            path:'/createmenu',
            element:<CreateMenuItem/>
          },
          {
            path:'/adminpage',
            element:<AdminOrdersPage/>
          },
          {
            path:'/menu/:id',
            element:<MenuDetails/>
          },
        ]
      }
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <UserContextProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </UserContextProvider>
    </Provider>
  </StrictMode>,
)
