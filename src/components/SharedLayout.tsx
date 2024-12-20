import Footer from './Footer'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default SharedLayout
