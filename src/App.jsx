import {useState, useEffect} from "react"
import CharacterContainer from "./components/CharacterContainer";
import Header from "./components/Header";
import Loader from "./components/Loader";

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)

    // window.onload(setLoading(false))

    // I´LL LEAVE setTimeout SO YOU CAN SEE THE LOADER
    setTimeout(() => {
      setLoading(false)  
    },2000)
  },[]);

  return (
    <>
      {loading ?
        <Loader />
        :
      <>
        <Header />
        <CharacterContainer />
      </>  
      }
    </>
  );
}

export default App;
