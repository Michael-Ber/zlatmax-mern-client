import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://zlatmax.onrender.com/api/auth";

const initialState = {
    user: '',
    message: '',
    token: '',
    totalSum: 0,
    isLoading: false,
    isError: false,
    showModal: false,
    searchResult: [],
    process: ''
};

export const register = createAsyncThunk(
    'auth/register',
    async(data) => {
        const resp = await fetch(`${url}/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const respJSON = await resp.json();
        if(respJSON.token) {
            window.localStorage.setItem('token', respJSON.token);
        }
        return respJSON;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async(data) => {
        const resp = await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify(data)
        });
        const respJSON = await resp.json();
        if(respJSON.token) {
            window.localStorage.setItem('token', respJSON.token);
        }
        return respJSON
    }
);

export const me = createAsyncThunk(
    'auth/me',
    async() => {
        const resp = await fetch(`${url}/me`, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('token')
            }
        })
        const respJSON = await resp.json();
        if(respJSON.token) {
            window.localStorage.setItem('token', respJSON.token);
        }
        return respJSON;
    }
);



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => { 
            state.user = ''; 
            state.message = ''; 
            state.token = '';
            state.totalSum = 0;
            state.isLoading = false;
            state.isError = false
        },
        changeTotalSum: ( state, action ) => {
            state.totalSum = action.payload;
        },
        setShowModal: ( state, action ) => { 
            state.showModal = action.payload;
        },
        setSearchResult: (state, action) => {
            state.searchResult = action.payload;
        },
        changeItemAmount : ( state, action ) => {
            state.user.cort.map(item => {
                if(item._id === action.payload.id) {
                    return item.amount = action.payload.amount
                }
                return item
            })
        },
        resetingMessage: state => { state.message = '' }
    },
    extraReducers: {
        //REGISTRATION
        [register.pending]: state => { state.isLoading = true },
        [register.fulfilled]: ( state, action ) => { 
            state.isLoading = false; 
            state.user = action.payload.newUser; 
            state.message = action.payload.message; 
            state.token = action.payload.token; 
            state.showModal = true;
        },
        [register.rejected]: state => { state.isLoading = false; state.isError = true; state.showModal = true },

        //LOGIN
        [login.pending]: state => { state.isLoading = true },
        [login.fulfilled]: ( state, action ) => { 
            state.isLoading = false; 
            state.user = action.payload.user; 
            state.message = action.payload.message; 
            state.token = action.payload.token; 
            state.showModal = true;
        },
        [login.rejected]: state => { state.isLoading = false; state.isError = true; state.showModal = true; },

        //GETME
        [me.pending]: state => { state.isLoading = true },
        [me.fulfilled]: ( state, action ) => { 
            state.isLoading = false; 
            state.user = action.payload.user; 
            state.token = action.payload.token; 
        },
        [me.rejected]: state => { state.isLoading = false; state.isError = true },

        
    }
});

export const { 
    logout, 
    changeTotalSum, 
    setShowModal, 
    setSearchResult, 
    changeItemAmount,
    resetingMessage } = authSlice.actions;

export default authSlice.reducer;