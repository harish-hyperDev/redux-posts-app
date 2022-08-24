import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {id: "1", title: "About Redux", content: "Best use for managing state"},
    {id: "2", title: "Redux Toolkit", content: "The king of state management"}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        /*
            postAdded(state, action) {
                return ([ ...state, action.payload ])
            }
        */
        postAdded: {
            reducer(state, action) {
                return ([ ...state, action.payload ])
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
                    state.filter(post => action.payload.id !== post.id )
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
            },
            prepare(id,title,content) {
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