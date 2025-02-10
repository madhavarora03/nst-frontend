import {Outlet} from "react-router";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  return (
      <>
        <Header/>
        <main className="min-h-[calc(100vh-18rem+2px)] bg-base-300">
          <Outlet/>
        </main>
        <Footer/>
      </>

  )
}