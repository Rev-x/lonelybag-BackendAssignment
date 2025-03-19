import { useState } from "react";
import { createUser } from "../services/api";

const CreateUser = () => {
  const [data, setData] = useState({
    id: "",
    name: "",
    phone_no: "",
    address: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(data);
      alert("User created successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Error creating user");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="id" placeholder="ID" onChange={handleChange} />
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="phone_no" placeholder="Phone" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateUser;
