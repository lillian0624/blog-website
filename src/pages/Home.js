import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const postCollectionRef = collection(db, "post");
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "post", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="homePage">
      {postLists.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          isAuth={isAuth}
          deletePost={deletePost}
        />
      ))}
    </div>
  );
}

function PostItem({ post, isAuth, deletePost }) {
  const [postImages, setPostImages] = useState([]);
  const imageListRef = ref(storage, `images/${post.id}/`);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageListRef = ref(storage, `images/${post.id}/`);
        const images = await listAll(imageListRef);

        const urls = await Promise.all(
          images.items.map(async (image) => getDownloadURL(image))
        );

        setPostImages(urls);
      } catch (error) {
        // Handle error (e.g., image not found)
        console.error("Error fetching image:", error);
      }
    };

    fetchImages();
  }, [post.id]);

  return (
    <div className="post">
      <div className="postHeader">
        <div className="title">
          <h1>{post.title}</h1>
        </div>

        <div className="postTextContainer">{post.postText}</div>
        <h3>@{post.author.name}</h3>

        <div className="deletePost">
          {isAuth && post.author.id === auth.currentUser.uid && (
            <button onClick={() => deletePost(post.id)}> &#128465;</button>
          )}

          {post.imageUrl && (
            <img src={post.imageUrl} alt={`post-${post.id}-image`} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
