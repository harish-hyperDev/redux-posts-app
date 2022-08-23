import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {id: "1", title: "About Redux", content: "Best use for managing state"},
    {id: "2", title: "Redux Toolkit", content: "The king of state management"}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded:{ 
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
                
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts;
export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;