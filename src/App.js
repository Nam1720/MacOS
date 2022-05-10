import { useEffect, useState } from "react";
import "./App.scss";
import WorkForm from "./components/dock/workForm";
import Dock from "./components/dock/dock";
import Header from "./components/header/header";
import Loading from "./components/loading/loading";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <>
        <div id="main">
          <img
            src={require("./assets/images/bigsur-light.jpg")}
            alt="ảnh nền"
            className="bg-img"
          />
          <Header />
          <Dock />
          <WorkForm />
        </div>
      </>
    );
  }
}

export default App;
