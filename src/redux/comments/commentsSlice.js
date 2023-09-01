import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    isLoading: false,
    isError: false
};

const URL = "https://zlatmax.onrender.com/good/comments"

//"https://zlatmax.onrender.com/good/comments/:id"

export const getComments = createAsyncThunk(
    'comments/getComments',
    async(id) => {
        try {
            const resp = await fetch(`${URL}/${id}`)
            return await resp.json();
        } catch (error) {
            console.log(error)
        }
    }
)

export const addComment = createAsyncThunk(
    'comments/addComment',
    async({text, goodId, isReply=false, commentId=''}) => {
        try {
            
            const resp = await fetch(`${URL}/add_comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem('token')
                },
                body: JSON.stringify({text, goodId, isReply, commentId})
            })
            const respJSON = await resp.json();
            return respJSON
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeComment = createAsyncThunk(
    'comments/removeComment',
    async({commentId, goodId}) => {
        try {
            const resp = await fetch(`${URL}/remove_comment/${goodId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem('token')
                },
                body: JSON.stringify({commentId, goodId})
            })
            return await resp.json()
        } catch (error) {
            console.log(error)
        }
    }
)

export const replyAddComment = createAsyncThunk(
    'comments/replyComment',
    async({commentId, text}) => {
        try {
            const resp = await fetch(`${URL}/reply_comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem('token')
                },
                body: JSON.stringify({commentId, text})
            });
            return resp.json()
        } catch (error) {
            console.log(error);
        }
    }
);

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: {
        //GET COMMENTS
        [getComments.pending]: (state) => { state.loading = true },
        [getComments.fulfilled]: (state, action) => { state.isLoading = false; state.isError = false; state.comments = action.payload.comments },
        [getComments.rejected]: (state) => { state.isLoading = false; state.isError = true },

        //ADD COMMENT
        [addComment.pending]: (state) => { state.loading = true },
        [addComment.fulfilled]: (state, action) => { 
            state.isLoading = false; 
            state.isError = false; 
            state.comments.push(action.payload.newComment);
        },
        [addComment.rejected]: (state) => { state.isLoading = false; state.isError = true },

        //REMOVE COMMENT
        [removeComment.pending]: (state) => { state.loading = true },
        [removeComment.fulfilled]: (state, action) => { 
            state.isLoading = false; 
            state.isError = false; 
            // const arrIds = state.comments.map(item => item._id)
            // const arrWithoutDeletedIds = action.payload.id.filter(id => {
            //     return arrIds.indexOf(id) < 0
            // });
            // const arr = state.comments.filter(item => {
            //     return arrWithoutDeletedIds.indexOf(item._id) 
            // });
            // console.log(arr, state.comments);
            // state.comments = arr;

            // state.comments = state.comments.filter(item => item._id !== action.payload.id) 
        },
        [removeComment.rejected]: (state) => { state.isLoading = false; state.isError = true },

        //REPLY COMMENT
        [replyAddComment.pending]: (state) => { state.loading = true },
        [replyAddComment.fulfilled]: (state, action) => { state.isLoading = false; state.isError = false; state.comments.reply.push(action.payload.newReply) },
        [replyAddComment.rejected]: (state) => { state.isLoading = false; state.isError = true },
    }
});

const { reducer } = commentsSlice;
export default reducer;