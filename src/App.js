import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainTab from "./components/MainTab";
import Entry from "./components/General";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainTab />}>
          <Route element={<Entry />} />
          <Route element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
