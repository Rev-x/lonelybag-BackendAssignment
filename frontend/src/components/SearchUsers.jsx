import { useState } from "react";
import { searchUsers } from "../services/api";

const SearchUsers = () => {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchUsers(name);
      setResults(response.data);
    } catch (err) {
      alert("Error searching users");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((user) => (
          <li key={user.id}>
            {user.name} - {user.phone_no} - {user.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsers;
