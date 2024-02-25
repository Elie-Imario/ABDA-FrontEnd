import PageRouter from "./Pages/PageRouter";
import "./plugins/font-plugin-kit.js";
import "./plugins/fa-plugin-kit.js";
import "./App.scss";

const Main = () => {
  return (
    <div className="App">
      <PageRouter />
    </div>
  );
};

function App() {
  return <Main></Main>;
}

export default App;
