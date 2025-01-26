import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/userContext';
import { IKImage } from 'imagekitio-react';
import { LogOutIcon, Plus, Settings, SettingsIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import Cart from './Cart';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const {user,isAuthenticated,logout} = useAuth()
  const navigate = useNavigate()

  const [open,setOpen] = useState(false)

  const handleLogout = async() => {
    const result = await logout(); 
    setOpen(prev=>!prev)
    if (result.success) {
      toast.success("Logged out!")
      navigate('/'); 
      window.location.reload();
    }
  }

  const cartItems = useSelector(state => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 backdrop-blur-md bg-gradient-to-r from-white/60 via-gray-50/50 to-white/60 dark:from-[#121212]/80 dark:via-gray-900/60 dark:to-[#121212]/80 shadow-md z-20">

    <nav className="flex justify-between items-center py-2 border-b border-gray-200/20 px-4 ">
      <div className='flex gap-2'>
        <Link to={"/"} className='w-24 h-14'>
        <DotLottieReact
        src="https://lottie.host/63ece32b-08e4-4c67-8fe1-09e51c0bfc51/bTYBtnmBVw.lottie"
        loop
        autoplay
        className="w-24 h-14 -mt-4 -ml-8 transition-transform duration-200 hover:scale-105"
        />
        </Link>
        </div>
        <span className="text-lg font-medium text-gray-600 dark:text-gray-300 tracking-wide">
  Order Your <span className="text-orange-500 font-semibold">Food</span>
</span>

    <ThemeToggle/>
       <div className="flex items-center gap-4">
       {isAuthenticated && user.role === 'admin' && (
         <Link 
           to="/createmenu" 
           className="flex items-center gap-2 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-300 transition-all"
         >
           <Plus size={20} />
         </Link>
       )}
       <Cart itemCount={itemCount} />
       {isAuthenticated? 
       <button onClick={()=>setOpen(prev=>!prev)} className=' flex gap-1 text-xl items-center justify-center '>
       {user?.avatar?<span className="h-10 w-10 rounded-full shadow-md border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <IKImage
                    urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                    path={user?.avatar}
                    width="200"
                    transformation={[{
                      height: 200,
                      width: 200,
                      quality: 70
                    }]}
                    lqip={{ active: true, quality: 20 }}
                    loading="lazy"
                    style={{
                      borderRadius:"50%",
                      objectFit:"cover",
                      width:"40px",
                      height:"40px"
                    }}
                  />
       </span> :<span className='h-10 w-10 rounded-full bg-gray-300/60 shadow-xs '>
        <h3 className='mt-0.5 text-2xl text-gray-400'>{user?.name?.charAt(0).toUpperCase()}</h3>
        </span>}
        <span>👋</span>
        <span>{(user.name).split(' ')[0]}</span>
        </button>
       :<Link to={'/login'}>
       <button
       className="px-4 py-2 bg-red-500 rounded-xl hover:bg-red-600 focus:ring-2 focus:ring-red-300 font-semibold shadow-md text-white transition-all" >
       Login
     </button>
         </Link>
     }
        {open &&
          <div className='flex flex-col dropdown'>
          <ul className="flex flex-col gap-4">
  <Link onClick={() => setOpen(prev => !prev)} to="/dashboard" className="flex items-center gap-2 hover:text-blue-500">
    <Settings size={16} /> Settings
  </Link>
  <li onClick={handleLogout} className="cursor-pointer flex items-center gap-2 hover:text-red-500">
    <LogOutIcon size={16} /> Logout
  </li>
</ul>
        </div>
        }
    </div>
    </nav>
    </header>
  )
}

export default Navbar