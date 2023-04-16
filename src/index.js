import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/userForm/Login';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Event from './pages/event/Event';
import ProtectedRoute from './routes/protectedRoute';
import { ThemeProvider } from '@material-tailwind/react';
import Drawers from './componants/dashboard';
const root = ReactDOM.createRoot(document.getElementById('root'));



const routes = createBrowserRouter([
    {
       path:"/",
       element:<Login/>
    },
    {
        path:"dashboard",
        element:<Drawers/>
    },
    {
        path: "event",
        element: <ProtectedRoute><Event/></ProtectedRoute>
    },
    
])

root.render(
    <AuthProvider>
     <ThemeProvider>
     <RouterProvider router={routes} />
     </ThemeProvider>
        
    </AuthProvider>
);


