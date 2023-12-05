import './App.css';
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterThought from "./components/RegisterThought";
import Thought from "./components/Thought";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
      <div className='flex flex-col items-center p-2'>
          <BrowserRouter>
              <Routes>
                  <Route index element={<h1>Homepage</h1>} />
                  <Route path={'/register'} element={<RegisterThought />} />
                  <Route path={'/thought/:id'} element={<Thought />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
