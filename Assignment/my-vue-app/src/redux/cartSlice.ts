import { createSlice } from '@reduxjs/toolkit'
import { ICartProduct } from '../models'
import type { RootState } from '../redux/store'

interface ICart {
    value: ICartProduct[],
    totalMoney: number,
    totalQuantity: number,
}

const initialState: ICart = {
    value: [],
    totalMoney: 0,
    totalQuantity: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            let tongtien: number = 0;
            const findEx = state.value.find((item) => item._id === action.payload._id);
            if (findEx) {
                state.value = state.value.map((item) => {
                    return item._id === action.payload._id
                        ? {
                            ...item,
                            quantity: item.quantity + action.payload.quantity,
                            totalPrice:
                                (item.quantity + action.payload.quantity) * item.price,
                        }
                        : item;
                });
            } else {
                state.value.push(action.payload);
                state.totalQuantity += 1;
            }
            state.value.forEach((item) => (tongtien += item.totalPrice || 0));
            state.totalMoney = tongtien;
        },
        deleteCart: (state, action) => {
            let tongtien = 0;
            state.value = state.value.filter((item) => item._id !== action.payload);
            state.totalQuantity -= 1;
            state.value.forEach((item) => (tongtien += item.totalPrice));
            state.totalMoney = tongtien;
            localStorage.setItem("cart", JSON.stringify(state.value));
          },
        deleteAllCart:(state,action)=>{
            if(action.payload){
              state.value = [];
              state.totalMoney = 0;
              state.totalQuantity = 0;
            }
          }
    },
})
const { actions, reducer } = cartSlice;
export const { addCart,deleteCart,deleteAllCart } = actions;
export const selectCount = (state: RootState) => state.cart.value
export default reducer;