import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, createRoutesFromChildren, Route, RouterProvider} from "react-router";

import HomePage from "./pages/HomePage.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import Providers from "./components/Providers.tsx";

const router = createBrowserRouter(
    createRoutesFromChildren(
        <Route element={<App/>}>
          <Route element={<ProtectedRoutes/>}>
            <Route index element={<HomePage/>}/>
          </Route>
        </Route>
    )
)

createRoot(document.getElementById('root')!).render(
    <Providers>
      <RouterProvider router={router}/>
    </Providers>
)
