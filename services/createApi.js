import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`, credentials:'include'
    }),
    
    tagTypes:['Menu','Order'],
    endpoints: (builder) => ({

        //fetch menu
        getMenuItems : builder.query({
            query: ({page,limit,search,sort,category}) => ({
                url:'/menu',
                params:{page,limit,search,sort,category}
            }),
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}-${queryArgs.search || ''}-${queryArgs.sort || 'name-asc'}-${queryArgs.category || ''}`;
            },
              merge: (currentCache, newItems) => {
                const currentIds = new Set(currentCache.data?.map((item) => item._id));
                const uniqueItems = newItems.data.filter((item) => !currentIds.has(item._id));
                currentCache.data = [...(currentCache.data || []), ...uniqueItems];
              },
              forceRefetch: ({ currentArg, previousArg }) => {
                return (
                    currentArg?.page !== previousArg?.page ||
                    currentArg?.search !== previousArg?.search
                );
            },
            providesTags:['Menu']
        }),

        //fetch menu item by slug
        getMenuItemByid : builder.query({
            query: (id) => `/menu/${id}`,
            providesTags: (result, error, id) => [{ type: 'Menu', id }],
        }),

        //add menu items
        addMenuItem: builder.mutation({
            query: (newItem) => ({
                url:'/menu',
                method:"POST",
                body:newItem
            }),
            invalidatesTags:["Menu"]
        }),

        //update a menu
        updateMenuItem: builder.mutation({
            query:(upatedData)=>({
                url:`/menu/${upatedData.id}`,
                method:"PATCH",
                body:upatedData
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Menu' }, 
                { type: 'Menu', id }, 
              ],
        }),

        //delete item from menu
        deleteMenuItem: builder.mutation({
            query:(id)=>({
                url:`/menu/${id}`,
                method:"DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Menu' }, 
                { type: 'Menu', id }, 
              ],
        }),

        //create order
        createOrder: builder.mutation({
            query:(order)=>({
                url:'/order',
                method:"POST",
                body:order
            }),
            invalidatesTags:['Order']
        }),

        //order history
        getOrderOfUser: builder.query({
           query:()=>'/order',
           providesTags:['Order']
        }),

        getAllOrdersAdmin:builder.query({
            query:(sort)=>({
                url:'/order/orderadmin',
                params:{sort:sort}
            }),
            providesTags:['Order'],
        }),

        updateOrderStatus:builder.mutation({
            query:({id,status})=>({
                url:`/order/orderadmin/${id}`,
                method:'PUT',
                body:{status}
            }),
            invalidatesTags: ["Order"]
        })
    })
})

export const {useGetMenuItemsQuery,useAddMenuItemMutation,useDeleteMenuItemMutation,useUpdateOrderStatusMutation,
    useUpdateMenuItemMutation,useGetMenuItemByidQuery,useCreateOrderMutation,useGetOrderOfUserQuery,useGetAllOrdersAdminQuery} = api