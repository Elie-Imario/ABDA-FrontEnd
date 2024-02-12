import Layout from './Layout';
import Pages from './Pages/index.js';
import './plugins/font-plugin-kit.js'
import './App.scss'

const Main = () => {


  return (
    <div className="App">
      {
        // <Login />
        <Layout>
          <Pages />
        </Layout>
      }
    </div>
  )
}

function App() {
  return (
      <Main></Main>
  );
}

export default App
