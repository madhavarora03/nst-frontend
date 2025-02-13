import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, createRoutesFromChildren, Route, RouterProvider} from "react-router";

import HomePage from "./pages/HomePage.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import Providers from "./components/Providers.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AuthOutlet from "./components/AuthOutlet.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

const router = createBrowserRouter(
    createRoutesFromChildren(
        <Route element={<App/>}>
          <Route element={<ProtectedRoutes/>}>
            <Route index element={<HomePage/>}/>
          </Route>
          <Route element={<AuthOutlet/>}>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Route>
        </Route>
    )
)

createRoot(document.getElementById('root')!).render(
    <Providers>
      <RouterProvider router={router}/>
    </Providers>
)
