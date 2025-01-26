import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import { Toaster } from "react-hot-toast"

const RootLayout = () => {
  return (
    <>
    <Navbar/>
    <Toaster
     position="bottom-right"
      reverseOrder={false}
    />
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
    <Outlet/>
    </div>
    </>
  )
}

export default RootLayout