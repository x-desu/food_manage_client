import { useParams } from "react-router";
import { useGetMenuItemByidQuery, useDeleteMenuItemMutation, useUpdateMenuItemMutation } from "../../services/createApi";
import { IKImage } from 'imagekitio-react';
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Image from "./Image";

const MenuDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data,isLoading } = useGetMenuItemByidQuery(id);
    const [deleteMenuItem,{isLoading:updateLoading,isSuccess:deleteSuccess}] = useDeleteMenuItemMutation();
    const [updateMenuItem,{isLoading:deleteLoading,isSuccess:updateSuccess}] = useUpdateMenuItemMutation();
    
    const [isEditing, setIsEditing] = useState(false);
    const [img, setImg] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category: ''
    });

    const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Snacks'];

    useEffect(()=>{
      if(updateSuccess){
        toast.success("Item updated successfully");
      }
    },[updateSuccess])

    useEffect(()=>{
      if(deleteSuccess){
        toast.success("Item deleted successfully");
      }
    },[deleteSuccess])

    // Initialize form data when data is loaded
    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name,
                price: data.price,
                stock: data.stock,
                category: data.category
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDelete = async () => {
        try {
            await deleteMenuItem(id);
            
            navigate('/');
        } catch (error) {
            toast.error("Failed to delete item");
        }
    };

    const handleUpdate = async () => {
      const updatedData = {
        id,
        ...formData,
        image: img?.filePath || data.image
      }
      console.log(updatedData)
        try {
            await updateMenuItem(updatedData);
            setIsEditing(false);
            
        } catch (error) {
            toast.error("Failed to update item");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white dark:bg-[#282828] rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-[400px]">
                    {isEditing && (
                        <div className="absolute bottom-4 right-4 z-10">
                            <Image setData={setImg}>
                                <button className="bg-white/90 dark:bg-neutral-900 px-4 py-2 rounded-lg shadow-md hover:bg-white">
                                    Change Image
                                </button>
                            </Image>
                        </div>
                    )}
                    {img?<IKImage
                        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                        path={img?.filePath || data.image}
                        transformation={[{
                            height: 800,  
                            width: 1200  
                        }]}
                        height="800"
                        width="1200"
                        loading="lazy"
                        lqip={{ active:true }}
                        className="w-full h-full object-cover"
                    />:<IKImage
                    urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                    path={data.image}
                    transformation={[{
                        height: 800,  
                        width: 1200  
                    }]}
                    height="800"
                    width="1200"
                    loading="lazy"
                    lqip={{ active:true }}
                    className="w-full h-full object-cover"
                />}
                </div>

                <div className="p-6">
                    {isEditing ? (
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-1/2 px-3 py-2 border rounded-lg"
                                />
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="w-1/2 px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold dark:text-slate-100 text-gray-800">{data.name}</h1>
                            <div className="flex justify-between items-center">
                                <p className="text-2xl font-bold text-orange-600">₹{data.price}</p>
                                <span className="bg-gray-100 dark:bg-neutral-900 px-3 py-1 rounded-full text-sm">
                                    {data.category}
                                </span>
                            </div>
                            <p className={`text-sm ${data.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {data.stock > 0 ? `${data.stock} in stock` : 'Out of stock'}
                            </p>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        {isEditing ? (
                            <>
                                <button  onClick={handleUpdate} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                                    Save
                                </button>
                                <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                    Edit
                                </button>
                                <button disabled={deleteLoading} onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuDetails;