import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    goods: [],
    order: [],
    isLoading: false, 
    isError: false,
    process: '',
    message: ''
};

const URL = "https://zlatmax.onrender.com";
//https://zlatmax.onrender.com
export const getGoods = createAsyncThunk(
    'goods/fetchGoods',
    async() => {
        const resp = await fetch(URL);
        return await resp.json();
    }
);

export const addToCort = createAsyncThunk(
    'goods/addToCort',
    async({goodId, additional = {amount: 1}}) => { 
        try {
            const resp = await fetch(`${URL}/cort`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                body: JSON.stringify({goodId, additional})
            })
            const respJSON = await resp.json();
            return respJSON;
        } catch (error) {
            console.log(error)
        }
    }
);

export const removeItemFromCart = createAsyncThunk(
    'goods/removeItemFromCart',
    async({goodId}) => {
        try {
            const resp = await fetch(`${URL}/cort`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem('token')
                },
                body: JSON.stringify({goodId})
            });
            const respJSON = await resp.json();
            return respJSON;
        } catch (error) {
            console.log(error)
        }
    }
);

export const addToFavorites = createAsyncThunk(
    'goods/addToFavorites',
    async({goodId}) => {
        try {
            const resp = await fetch(`${URL}/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                body: JSON.stringify({goodId})
            })
            const respJSON = await resp.json();
            return respJSON;
        } catch (error) {
            console.log(error)
        }
    }
);

export const removeItemFromFavorites = createAsyncThunk(
    'goods/removeItemFromFavorites',
    async({goodId}) => {
        try {
            const resp = await fetch(`${URL}/favorites`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem('token')
                },
                body: JSON.stringify({goodId})
            });
            const respJSON = await resp.json();
            return respJSON;
        } catch (error) {
            console.log(error)
        }
    }
);

export const sendOrder = createAsyncThunk(
    'goods/sendOrder',
    async({order}) => {
        try {
            console.log(order);
            const resp = await fetch(`${URL}/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                body: JSON.stringify(order)
            });
            const respJSON = await resp.json();
            return respJSON;
        } catch (error) {
            console.log(error);
        }
    }
);

const goodsSlice = createSlice({
    name: "goods",
    initialState,
    reducers: {
        makeOrder: ( state, action ) => {
            state.order = action.payload;
        },
        removeItemFromOrder: (state, action) => {
            state.order.filter(item => item._id !== action.payload.id)
        },
        resetingMessage: state => { state.message = '' }
    },
    extraReducers: {
        //Getting goods from db
        [getGoods.pending]: state => { state.isLoading = true; state.process = 'pending' },
        [getGoods.fulfilled]: ( state, action ) => { state.isLoading = false; state.isError = false; state.process = 'fulfilled'; state.goods =  action.payload.goods},
        [getGoods.rejected]: state => { state.isLoading = false; state.isError = true; state.process = 'rejected' },

        //add good to users cart
        [addToCort.pending]: state => { state.isLoading = true;  },
        [addToCort.fulfilled]: state => { state.isLoading = false; state.isError = false; },
        [addToCort.rejected]: state => { state.isLoading = false; state.isError = true;  },

        //remove good from user cart
        [removeItemFromCart.pending]: state => { state.isLoading = true; },
        [removeItemFromCart.fulfilled]: state => { state.isLoading = false; state.isError = false; },
        [removeItemFromCart.rejected]: state => { state.isLoading = false; state.isError = true; },

        //add good to favorites
        [addToFavorites.pending]: state => { state.isLoading = true;  },
        [addToFavorites.fulfilled]: state => { state.isLoading = false; state.isError = false;},
        [addToFavorites.rejected]: state => { state.isLoading = false; state.isError = true; },

        //remove good from favorites
        [removeItemFromFavorites.pending]: state => { state.isLoading = true;},
        [removeItemFromFavorites.fulfilled]: state => { state.isLoading = false; state.isError = false; },
        [removeItemFromFavorites.rejected]: state => { state.isLoading = false; state.isError = true;  },

        //send order
        [sendOrder.pending]: state => { state.isLoading = true; },
        [sendOrder.fulfilled]: (state, action) => { state.isLoading = false; state.isError = false; state.message = action.payload.message},
        [sendOrder.rejected]: state => { state.isLoading = false; state.isError = true;  },

    }
});

const { reducer } = goodsSlice;
export default reducer;

export const { makeOrder, removeItemFromOrder, resetingMessage } = goodsSlice.actions;