import { useState } from "react";
import { updateUser } from "../services/api";

const UpdateUser = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState({ name: "", phone_no: "", address: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateUser(id, data);
      alert("User updated successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Error updating user");
    }
  };

  return (
    <div>
      <input type="text" placeholder="ID" onChange={(e) => setId(e.target.value)} />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="phone_no" placeholder="Phone" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateUser;
