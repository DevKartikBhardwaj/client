import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import manipContext from "../Contexts/ManipContext";
const Home = () => {
  //to reload site after a manipulation or change of some values in db like after CRUD in note
  const [manipValue, setManipValue] = useState(0);
  return (
    <manipContext.Provider value={{ manipValue, setManipValue }}>
      <Header />
      <Main />
    </manipContext.Provider>
  );
};

export default Home;
