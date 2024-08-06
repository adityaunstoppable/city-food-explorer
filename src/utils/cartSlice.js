import { createSlice  } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:"cart" ,
    initialState:{
        items:[]
    } ,
    reducers:{
        addItem : (state , action) => {
            if(action.payload.count > 1){
                state.items = state.items?.map(eachItem => {
                    if(eachItem.name == action.payload.name){
                        eachItem.count = action.payload.count
                    }
                    return eachItem
                })
            }else{
                state.items.push({name:action.payload.name , price:action.payload.price , count : action.payload.count})
            }
        }, 
        removeItem: (state , action) => {
            state.items = state.items.filter(eachItem => eachItem.name != action.payload) 
        },
        decreaseCount: (state , action) => {
            state.items = state.items.map(eachItem => {
                if(eachItem.name == action.payload){
                        eachItem.count = eachItem.count -1
                }
                return eachItem
            })
            state.items = state.items.filter(eachItem => eachItem.count > 0)
        },

        increaseCount: (state, action) => {
            state.items = state.items.map(eachItem => {
                if(eachItem.name === action.payload){
                    eachItem.count  = eachItem.count + 1
                }
                return eachItem
            })
        },
        clearCart : (state) => {
            state.items = []
        }
    }
})

export const {addItem , removeItem ,clearCart , decreaseCount , increaseCount}  = cartSlice.actions

export default cartSlice.reducer