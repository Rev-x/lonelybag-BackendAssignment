import { useState } from "react";
import { deleteUser } from "../services/api";

const DeleteUser = () => {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      alert("User deleted successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Error deleting user");
    }
  };

  return (
    <div>
      <input type="text" placeholder="ID" onChange={(e) => setId(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteUser;
