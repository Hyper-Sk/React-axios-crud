import { useEffect, useState } from "react";
import { addPost, updatePost } from "./../api/Post_API";

const Form = ({ data, setData, formData, setFormData }) => {
  const [addData, setAddData] = useState({ title: "", body: "" });

  // console.log(addData)

  const isEmpty = Object.keys(formData).length !== 0;
  // console.log(isEmpty)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Add post
  const addPostData = async () => {
    const res = await addPost(addData);
    // console.log(res)
    messageIndicator('add')
    setData([...data, res.data]);
    setAddData({ title: "", body: "" });
  };

  // udpate post
  const updatePostData = async () => {
    
    const res = await updatePost(formData.id,addData)
    console.log(res.data)
    
    setData((prev) => {
      return prev.map(item => {
        return res.data.id === item.id ? res.data : item;
      })
    })
    // console.log("update");
    messageIndicator('update')

    setAddData({ title: "", body: "" });
    setFormData({});
  };

  // form submittion 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;

    if (action === "Update") {
      updatePostData();
    } else if (action === "Add") {
      addPostData();
    }
  };

  // Edit Fields
  useEffect(() => {
    formData &&
      setAddData({
        title: formData.title || "",
        body: formData.body || "",
      });
  }, [formData]);

   const messageIndicator = (action) => {
    let added = document.querySelector(".added");
    let updated = document.querySelector(".updated");

    if (action === "add") {
      added.style.display = "block";
      setTimeout(() => {
        added.style.display = "none";
      }, 5000);
    }
  
    if (action === "update") {
      updated.style.display = "block";
      setTimeout(() => {
        updated.style.display = "none";
      }, 5000);
    }
  };

  return (
    <section className="form-area">
      <form method="post" onSubmit={handleFormSubmit}>
        <input
          required
          placeholder="Enter Title"
          type="text"
          name="title"
          value={addData.title}
          onChange={handleChange}
        />
        <textarea
          required
          placeholder="Enter Description"
          type="text"
          name="body"
          value={addData.body}
          onChange={handleChange}
        />
        <button value={isEmpty ? "Update" : "Add"}>
          {isEmpty ? "Update" : "Add"}
        </button>
      
      </form>
    </section>
  );
};

export default Form;
