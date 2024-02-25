import Layout from "./Layout";
import Pages from "./Pages/index.js";
import { useContext } from "react";
import { AppContext } from "./service/context/index.js";
import Login from "./Pages/Login/index.js";
import "./plugins/font-plugin-kit.js";
import "./plugins/fa-plugin-kit.js";
import "./App.scss";

const Main = () => {
  const { UserLogContext } = useContext(AppContext);
  return (
    <div className="App">
      {UserLogContext ? (
        <Layout>
          <Pages />
        </Layout>
      ) : (
        <Login />
      )}
    </div>
  );
};

function App() {
  return <Main></Main>;
}

export default App;
