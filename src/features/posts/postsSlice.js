import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: [
        { id: "1", title: "About Redux", content: "Best use for managing state" },
        { id: "2", title: "Redux Toolkit", content: "The king of state management" }
    ],
    error: ''
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', () => {
    return axios
        // .get('http://localhost:3030/posts')
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.data.map((user) => user.id))
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state) => {
            state.loading = false,
            state.users = action.payload,
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state) => {
            state.loading = false,
            state.users = [],
            state.error = action.error.message
        })

    },
    reducers: {
        /*
            postAdded(state, action) {
                return ([ ...state, action.payload ])
            }
        */
        postAdded: {
            reducer(state, action) {
                return ([...state, action.payload])
            },
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content
                    }
                }
            }
        },
        postDelete: {
            reducer(state, action) {
                // console.log("state", action.payload)
                return (
                    state.filter(post => action.payload.id !== post.id)
                )
            },
            prepare(id) {
                // console.log(id, title, content)
                return {
                    payload: {
                        id
                    }
                }
            }
        },
        postEdit: {
            reducer(state, action) {
                console.log(action.payload)

                state.map(post => {
                    if (action.payload.id === post.id) {
                        post.title = action.payload.title
                        post.content = action.payload.content
                    }
                }
                )
            },
            prepare(id, title, content) {
                return {
                    payload: {
                        id,
                        title,
                        content
                    }
                }
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts;
export const { postAdded, postDelete, postEdit } = postsSlice.actions;

export default postsSlice.reducer;