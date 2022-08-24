import { useState } from "react";
import { useDispatch } from "react-redux";

import { postAdded } from "./postsSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);

    const onSavePost = (e) => {
        e.preventDefault();
        if (title && content) {
            dispatch(
                postAdded(title, content)
                // postAdded({
                //     id: some_id,
                //     title,
                //     content
                // })
            )
        }
        setTitle('')
        setContent('')

    }

    return (
        <section style={{ border: "1px solid grey", width: "fit-content" ,borderRadius: "6px", alignContent: 'center', textAlign: "center" }}>
            <form style={{ textAlign: "left", padding: "5% 15%", borderRadius: "6px", display: "inline-grid", width: "fit-content", gridTemplateColumns: "100px 225px" }}>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    style={{width: "70%"}}
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}   
                    onChange={onTitleChange}
                />

                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    style={{width: "70%"}}
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                />
            </form>
            <button style={{ marginBottom: "20px" }} type="button" onClick={(event) => onSavePost(event)}>Save Post</button>
        </section>
    )
}

export default AddPostForm;