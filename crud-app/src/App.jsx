import axios from "axios";
import { getPosts } from "./api/Post_API";
import { useEffect, useState } from "react";
import { deletePost } from "./api/Post_API";
import "./App.css";
import Form from "./components/Form";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});

  // console.log(formData);

  const getPostsData = async () => {
    const res = await getPosts();
    setData(res.data);
  };
  useEffect(() => {
    getPostsData();
  }, []);

  const handleDelete = async (id) => {
    const res = await deletePost(id);
    if (res.status === 200) {
      const updatedData = data.filter((item) => {
        return item.id !== id;
      });
      messageIndicator("delete");
      setData(updatedData);
    } else {
      console.log("Failed to Delete Post", res.status);
    }
  };

  const handleUpdate = (item) => {
    setFormData(item);
    scrollTo(0, 0);
  };


  // const handleAllDelete = async () => {
  //   setData([])
  // }

  const messageIndicator = (action) => {
    let deleted = document.querySelector(".deleted");
    if (action === "delete") {
      deleted.style.display = "block";
      setTimeout(() => {
        deleted.style.display = "none";
      }, 5000);
    }
  };

  return (
    <main className="app">
      <div className="added">Message Added Successfully !!!</div>
      <div className="deleted">Message Deleted Successfully !!!</div>
      <div className="updated">Message Updated Successfully !!!</div>

      <section className="heading">
        <h1>React-Axios CRUD App</h1>
        <p>
          A React CRUD app using Axios for API integration. Supports Create,
          Read, Update, and Delete operations with React Hooks, error handling,
          and a responsive UI for seamless data management.{" "}
        </p>
      </section>

      <Form
        data={data}
        setData={setData}
        formData={formData}
        setFormData={setFormData}
      />

      {/* <section className="buttons">
        <button onClick={handleAllDelete}>Clear all messages</button>
      </section> */}

      <section className="posts-container">
        {data.map((item, index) => {
          return (
            <div className="card" key={index}>
              <div className="head">{item.title}</div>
              <div className="content">
                <p>{item.body}</p>
                <span>{item.id}</span>
                <br />
                <button className="button" onClick={() => handleUpdate(item)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
      <footer>Crafted by @Shaik Sohail</footer>
    </main>
  );
};

export default App;
