import React, { useEffect, useState } from "react";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const postCollectionRef = collection(db, "post");
  const navigate = useNavigate();

  const createPost = async () => {
    if (imageUpload == null) return;

    const imageName = imageUpload.name + v4();
    const imageRef = ref(storage, `images/${imageName}`);

    try {
      await uploadBytes(imageRef, imageUpload);
      console.log("Image Uploaded");

      // Clear input fields
      setTitle("");
      setPostText("");
      setImageUpload(null);

      // Get the generated postId
      const postDocRef = await addDoc(postCollectionRef, {
        title,
        postText,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });

      const postId = postDocRef.id;

      // Update the post document with the postId and imageUrl
      await setDoc(
        doc(db, "post", postId),
        {
          postId,
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/blogproject-4a273/o/images%2F${postId}%2F${imageName}?alt=media`,
        },
        { merge: true }
      );

      // Navigate after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <label>Title:</label>
        <input
          placeholder="Title..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>

        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />

        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
