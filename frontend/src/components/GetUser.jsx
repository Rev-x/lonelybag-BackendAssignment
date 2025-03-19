import { useState } from "react";
import { getUser } from "../services/api";

const GetUser = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState(null);

  const handleGetUser = async () => {
    try {
      const response = await getUser(id);
      setUser(response.data);
    } catch (err) {
      alert(err.response?.data?.detail || "User not found");
      setUser(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleGetUser}>Get User</button>

      {user && (
        <div>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Phone: {user.phone_no}</p>
          <p>Address: {user.address}</p>
        </div>
      )}
    </div>
  );
};

export default GetUser;
