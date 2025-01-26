import { useEffect, useState } from 'react';
import { IKImage } from 'imagekitio-react';
import Image from '../components/Image';
import { useAddMenuItemMutation } from '../../services/createApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const CreateMenuItem = () => {
  const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Snacks'];
  const [img, setImg] = useState("");
const navigate = useNavigate()
  const [addMenuItem,{error,isSuccess,isLoading }] = useAddMenuItemMutation()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
  });

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Item created");
//     }
//   }, [isSuccess]); // Runs only when `isSuccess` changes

//   useEffect(() => {
//     if (error) {
//       toast.error("Error creating item");
//     }
//   }, [error]);

useEffect(() => {
    // Update formData whenever img changes
    if (img) {
      setFormData(prev => ({ ...prev, image: img.filePath }));
    }
  }, [img]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(()=>{
    if(isSuccess){
        toast.success("Item created");
        navigate('/')
    }
  },[isSuccess])

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    console.log(formData)
    try {
        await addMenuItem(formData)
        
    } catch (error) {
        console.log(error)
        toast.error("Error creating item",error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Create Menu Item</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Image
          </label>
          <div className="mt-1 flex items-center gap-4">
            {img ? (
              <div className="relative w-32 h-32">
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                  path={img.filePath}
                  transformation={[{ height: 128, width: 128 }]}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <Image setData={setImg}>
              <button type="button" className="px-4 py-2 dark:bg-neutral-900 bg-gray-100 rounded-md hover:bg-orange-400 transition-colors">
                Upload Image
              </button>
            </Image>
          </div>
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
          />
        </div>

        {/* Stock Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full dark:bg-neutral-900 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button disabled={isLoading}
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {isLoading?"Loading...":"Create Item"}
        </button>
      </form>
    </div>
  );
};

export default CreateMenuItem;
