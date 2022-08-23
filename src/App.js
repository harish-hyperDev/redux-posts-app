import React from 'react';
import PostsList from './features/posts/postsList';
import AddPostForm from './features/posts/AddPostForm'
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <main className="App">
      <h2>Add a New Post</h2>
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
