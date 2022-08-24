import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, postDelete, postEdit } from "./postsSlice";

const PostsList = () => {
    const posts = useSelector(selectAllPosts)
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(null);

    const [change, setChange] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleDelete = (id) => {
        console.log(id);
        dispatch(
            postDelete(id)
        );
    }

    const handleUpdate = (id) => {
        setIsUpdated(false);
        setChange([...change, id, title, content]);
        setEditMode(false);
    }

    useEffect(() => {
        if (isUpdated === false) { 
            console.log(change); 
            dispatch(
                postEdit(change[0], change[1], change[2])
            )
            makeChange();
        }

    }, [change])

    const makeChange = () => {
        setChange([]);
        setIsUpdated(true);
    }

    const renderedPosts = posts.map((post, index) => (

        <div style={{ border: "1px solid grey", marginBottom: "10px", backgroundColor: "#F5F5F5", padding: "10px", borderRadius: "6px" }} key={post.id}>
            <button
                style={{ float: "right" }}
                key={post.id}
                onClick={() => handleDelete(post.id)}
            >
                X
            </button>

            {
                editMode === post.id ? <button style={{ float: "right" }} key={post.id} onClick={() => handleUpdate(post.id)}>Save</button>
                    : <button style={{ float: "right" }} key={post.id} onClick={() => setEditMode(post.id)}>Edit</button>
            }

            {
                editMode === post.id ? <input key={index} onChange={(e) => setTitle(e.target.value)} style={{ textAlign: "center" }}></input>
                    : <h3 key={index} style={{ textAlign: "center" }}>{post.title}</h3>
            }

            {
                editMode === post.id ? <input key={index} onChange={(e) => setContent(e.target.value)} style={{ wordWrap: "break-word", textAlign: "left", fontFamily: "Arial" }}></input>
                    : <h3 key={index} style={{ wordWrap: "break-word", textAlign: "left", fontFamily: "Arial" }}>{post.content.substring(0, 100)}</h3>
            }

        </div>
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