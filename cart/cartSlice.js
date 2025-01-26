import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{items:[]},
    reducers:{

        addItem:(state,action)=>{
            const{id,name,price} = action.payload
            const existingItem = state.items.find(item=>item.id === id)
            if(existingItem){
                existingItem.quantity += 1
            }else{
                state.items.push({
                    id,quantity:1,name,price
                })
            }
        },

        incrementItem: (state,action) => {
            const{id} = action.payload
            const existingItem = state.items.find(item=>item.id === id)
            if(existingItem){
                existingItem.quantity += 1
            }
        },
       
        decrementItem: (state,action) => {
            const{id} = action.payload
            const existingItem = state.items.find(item=>item.id === id)
            if(existingItem){
                if(existingItem.quantity === 1){
                    state.items = state.items.filter(item=>item.id !== id)
                }else{
                    existingItem.quantity -= 1
                }
            }
        },

        removeItem : (state,action)=>{
            const {id} = action.payload
            state.items = state.items.filter(item=>item.id !== id)
        },

        clearCart: (state)=>{
            state.items = []
        }

    }
})

export const { addItem, incrementItem, decrementItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;