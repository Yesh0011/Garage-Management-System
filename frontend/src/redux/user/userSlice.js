import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;    
    },
    signInSuccess : (state,action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null ;
    },
    signInFailure: (state,action) => {
    state.error = action.payload;
        state.loading = false ;

    },

    updateCustomerStart: (state) => {
        state.loading = true;    
    },

    updateCustomerSuccess: (state ,action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null ;
    },
    updateCustomerFailure: (state,action) => {
        state.error = action.payload;
            state.loading = false ;
    
        },


        deleteCustomerStart: (state) => {
            state.loading = true;    
        },

        deleteCustomerSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null ;
        },
        deleteCustomerFailure: (state,action) => {
            state.error = action.payload;
                state.loading = false ;
        
            },

            signOutCustomerStart: (state) => {
                state.loading = true;    
            },
    
            signOutCustomerSuccess: (state) => {
                state.currentUser = null;
                state.loading = false;
                state.error = null ;
            },
            signOutCustomerFailure: (state,action) => {
                state.error = action.payload;
                    state.loading = false ;
            
                },

                updateUserStart:(state) =>{
                    state.loading = true;
                },
                updateUserSuccess:(state,action) => {
                    state.currentUser = action.payload;
                    state.loading = false;
                    state.error = null;
                },
                updateUserFailure:(state,action) => {
                    state.error = action.payload;
                    state.loading = false;
                },
        
                deleteUserStart: (state) => {
                    state.loading = true;
                },
                deleteUserSuccess:(state) => {
                    state.currentUser = null;
                    state.loading = false;
                    state.error = null;
                },
                deleteUserFailure:(state,action) => {
                    state.error = action.payload;
                    state.loading = false;
                },
        
                signOutUserStart: (state) => {
                    state.loading = true;
                },
                signOutUserSuccess:(state) => {
                    state.currentUser = null;
                    state.loading = false;
                    state.error = null;
                },
                signOutUserFailure:(state,action) => {
                    state.error = action.payload;
                    state.loading = false;
                },
        
    
}
});

export const { 
    signInStart ,
    signInSuccess ,
    signInFailure ,
    updateCustomerStart,
    updateCustomerSuccess
    ,updateCustomerFailure,
    deleteCustomerStart,
    deleteCustomerSuccess,
    deleteCustomerFailure,
    signOutCustomerStart,
    signOutCustomerSuccess,
    signOutCustomerFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure
} =userSlice.actions ;

export default userSlice.reducer ;