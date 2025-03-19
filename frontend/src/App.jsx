import { useEffect } from "react";
import loadFirebaseConfig from "./services/firebase";
import CreateUser from "./components/CreateUser";
import GetUser from "./components/GetUser";
import SearchUsers from "./components/SearchUsers";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";

function App() {
  useEffect(() => {
    const initFirebase = async () => {
      await loadFirebaseConfig();
      console.log("Firebase initialized");
    };
    initFirebase();
  }, []);

  return (
    <div>
      <h1>FastAPI + Firebase + React</h1>
      <h2>Create User</h2>
      <CreateUser />
      <h2>Read User by ID </h2>
      <GetUser />
      <h2>Read User By Name </h2>
      <SearchUsers />
      <h2>Update User Details</h2>
      <UpdateUser />
      <h2>Delete User by ID </h2>
      <DeleteUser />
    </div>
  );
}


export default App;
