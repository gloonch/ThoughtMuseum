import './App.css';
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterThought from "./components/RegisterThought";
import Thought from "./components/Thought";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
      <div className='flex flex-col items-center' >
          <BrowserRouter>
              <Navbar />
              <Routes>
                  <Route index element={<HomePage />} />
                  <Route path={'/register'} element={<RegisterThought />} />
                  <Route path={'/thought/:id'} element={<Thought />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
