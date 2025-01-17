import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <>
      <Nav/>
      <div id='blur-overlay' className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-all duration-300 opacity-0 pointer-events-none" ></div>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout