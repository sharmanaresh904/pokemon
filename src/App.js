import './App.css';
import Main from './Views/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Detail from './Views/Detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="pokemon/:id" element={<Detail />} />
        </Route>
      </Routes>     
    </BrowserRouter>
  );
}

export default App;
