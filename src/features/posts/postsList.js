import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, postDelete } from "./postsSlice";

const PostsList = () => {
    const posts = useSelector(selectAllPosts)
    const dispatch = useDispatch();
    
    const handleDelete = (id) => {
        console.log(id)
        dispatch( 
            postDelete(id) 
        )
        /* const newPosts = posts.filter((post) => {
            return id !== post.id
        }) */

    }

    const renderedPosts = posts.map(post => (
        
        <article style={{ border: "1px solid grey", marginBottom: "10px", backgroundColor: "#F5F5F5", padding: "10px", borderRadius: "6px" }} key={post.id}>
            <button 
                style={{float: "right"}} 
                key={post.id} 
                onClick={() => handleDelete(post.id)}
            >
                X
            </button>
            <h3>{post.title}</h3>
            <h3>{post.content.substring(0, 100)}</h3>
        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
            {/* <myPosts /> */}
        </section>
    )
}

export default PostsList