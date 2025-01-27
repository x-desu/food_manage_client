import { api, useGetMenuItemsQuery } from "../../services/createApi"
import toast from 'react-hot-toast';
import { IKImage } from 'imagekitio-react';
import { Link, useSearchParams } from "react-router";
import MenuItem from "./MenuItem";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useDebounce } from 'use-debounce';
import { useAuth } from "../../context/userContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Menu = () => {
    const [page, setPage] = useState(1); 
    const [searchParams,setSearchParams] = useSearchParams()
    const [searchInput,setSearchInput] = useState(searchParams.get('search') || '')
    const [debouncedSearch] = useDebounce(searchInput, 300);
    const [sortOption, setSortOption] = useState('name-desc'); 
    const limit = 4;
    const category = searchParams.get('category') || ''

    const {data, isLoading, error,isFetching} = useGetMenuItemsQuery(
        {page,limit,search:debouncedSearch,sort:sortOption,category},
        {
            refetchOnMount: false, 
            refetchOnReconnect: false, 
            refetchOnFocus:false,
            refetchOnMountOrArgChange: true,
          }
    );

      
    //optimistic search implementaion 1
    const filterData = typeof searchInput === 'string' && searchInput.trim()
    ? data?.data.filter((item) => {
          try {
              const escapedSearchInput = searchInput.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
              const regex = new RegExp(escapedSearchInput, 'i'); 
              return regex.test(item.name);
          } catch (error) {
              console.error('Regex error:', error);
              return false; 
          }
      })
    : data?.data;


    const hasMore = data ? data.data.length < data.total : false;
 

    const fetchMoreData = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = e.target.search.value
    setPage(1);
    if (query) {
        setSearchParams({ search: query });
    } else {
        setSearchParams({}); 
    }
  }

  const handleCategory = (item) => {
      setSearchParams({category:item})
      setPage(1)
  }
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setSearchParams({sort:sortOption }) 
    setPage(1); 
};
const categories = ['Appetizers', 'Main', 'Desserts', 'Beverages','Snacks'];

    if (isLoading) return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
   
    if (error) return toast.error(error.message || "error");

    return (
      <div className="py-8">
    <div className="relative px-4 py-2 border-2 rounded-2xl border-orange-400/60 mb-4">

    {/* Search */}
    <form className="flex" onSubmit={handleSubmit}>
        <input
            name="search"
            type="text"
            value={searchInput}
            onChange={(e)=>setSearchInput(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent outline-none placeholder-gray-500 font-semibold"
        />
        <button type="submit">
        <Search className="text-gray-400 hover:text-orange-400" />
        </button>
    </form>
    </div>
    <div>
    <div className="cursor-pointer flex gap-4 overflow-y-auto scroll-container">
        {categories.map((item)=>(
            <h3 onClick={()=>handleCategory(item)} 
            className="min-w-34 py-4  px-4 text-xl text-center  
             hover:bg-orange-600 hover:text-white-100
            rounded-full bg-orange-500 text-white" key={item}>{item}</h3>
        ))}
    </div>
    </div>
    <div className="flex items-center justify-between mt-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">Our Menu</h1>
        <div className="relative">
                    <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="appearance-none dark:bg-neutral-900 dark:text-slate-100 bg-white border-2 border-orange-400/60 rounded-2xl px-4 py-2 pr-8 text-gray-800 font-semibold focus:outline-none focus:border-orange-500"
                    >
                        <option  value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </div>
        
    </div>
            <InfiniteScroll
                dataLength={data?.data.length||0}
                scrollThreshold={0.65}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div>Loading more...</div>}
                endMessage={<div className="flex flex-col items-center justify-center">
                    <DotLottieReact
                src="https://lottie.host/8c0e4a3c-5bcf-4ce1-b078-8ece8738d9b8/LxAVmHFaD1.lottie"
                loop
                autoplay
                className="w-64"
                  speed={0.8} // Standard speed, feel free to adjust
                />
                No more data to load
                </div>}
            >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
          {filterData.map((item) => (
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" key={item._id}>
            <MenuItem item={item} />
          </div>
          ))}
        </div>
          </InfiniteScroll>
      </div>
    );
};

export default Menu;