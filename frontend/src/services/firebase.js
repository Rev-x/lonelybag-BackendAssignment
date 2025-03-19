import { initializeApp } from "firebase/app";

const loadFirebaseConfig = async () => {
  const response = await fetch(process.env.REACT_APP_FIREBASE_CONFIG_PATH);
  const config = await response.json();

  const app = initializeApp(config);
  return app;
};

export default loadFirebaseConfig;
