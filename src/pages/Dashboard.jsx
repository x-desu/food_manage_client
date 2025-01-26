import { useState, useEffect } from 'react';
import { useAuth } from "../../context/userContext";
import { HiCamera } from 'react-icons/hi';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from '../components/Image';
import { Save } from 'lucide-react';
import  IKImage  from 'imagekitio-react';
import { Link } from 'react-router';

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (img?.filePath) {
      handleImageUpload();
    }
  }, [img]);

  const handleNameUpdate = async () => {
    if (!newName.trim() || newName === user?.name) {
      setIsEditingName(false);
      return;
    }
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/updatename`,
        { name: newName,image:img?.url ,id:user.id},
        { withCredentials: true }
      );
        setUser(data.user);
        setIsEditingName(false);
      
        toast.success('updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update');
      setNewName(user?.name || '');
    } 
  };
  console.log(user)

  const handleImageUpload = async () => {
    if (!img?.filePath) return;
    
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/updateimage`,
        { 
          image: img.filePath,
          id: user.id 
        },
        { withCredentials: true }
      );
      
      setUser(data.user);
      toast.success('Profile picture updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile picture');
      setImg(null);
    }
  };

  return (
    <div className="min-h-screen py-8 ">
      <div className="max-w-4xl mx-auto px-4  ">
        <div className='flex justify-between items-center px-4'>
          <h1 className="text-2xl  text-gray-600 profile">My Profile</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6 relative">
          {/* Annotation */}
          <div className="absolute -top-6 right-20 pointer-events-none">
            <div className="relative">
              <span className="absolute -top-2 right-8 text-gray-600 rotate-[-4deg] font-caveat text-xl">
                Save!
              </span>
              <svg 
                width="60" 
                height="40" 
                className="absolute -right-4 top-0"
              >
                <path
                  d="M5,15 Q30,30 55,45"
                  stroke="#666"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4,2"
                  className="animate-draw"
                />
              </svg>
            </div>
          </div>
          
          <button onClick={handleImageUpload} disabled={!img} className=' font-semibold text-2xl text-orange-100 bg-red-500/80 px-2 py-1 rounded-l-full hover:scale-110 duration-75 absolute right-0 flex items-center gap-2'>
            <Save />
            <span className="text-base">save</span>
          </button>

          <div className="flex flex-col gap-8">
            {/* Left Column - Avatar */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                  {user?.avatar ? (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                      path={user.avatar}
                      transformation={[{
                        height: 400,
                        width: 400
                      }]}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      lqip={{ active: true }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <Image setData={setImg}>
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer">
                    <HiCamera className="w-5 h-5 text-gray-600" />
                  </button>
                </Image>
              </div>
              <p className="text-sm text-gray-500">
                Click the camera icon to update your profile picture
              </p>
            </div>

            {/* Right Column - User Info */}
            <div className="flex-1 space-y-6 ">
              {/* Name Field */}
              <div className='flex flex-col'>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>

                {isEditingName ? (
                  <div className="flex gap-2 flex-col ">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Enter your name"
                    />
                    <div className='flex gap-2'>
                    <button
                      onClick={handleNameUpdate}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors w-fit"
                      >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setNewName(user?.name || '');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors w-fit"
                      >
                      Cancel
                    </button>
                      </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-lg">{user?.name}</span>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-orange-500 hover:text-orange-600"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-500">
                  {user?.email}
                </div>
              </div>

              {/* Account Actions */}
              <div className="pt-4 border-t border-gray-200 flex justify-between flex-col sm:flex-row gap-4">
                <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {/* Implement password change logic */}}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center"
                    >
                    Change Password
                  </button>
                    </div>
                </div>

                  {user.role === 'admin' && <div>
                    <h3 className="text-lg font-medium text-red-400 mb-4">Customer Order Details</h3>
                    <Link to={'/adminpage'}
                    className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                    Order
                    </Link>
                  </div>}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                      <Link to={'/orderhistory'}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center"
                      >
                      Order
                      </Link>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;