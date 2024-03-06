import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainTab from "./components/MainTab";
import Entry from "./components/General";
import Details from "./components/Details";
import { SalesOrderProvider } from "./components/CustomerContext";
import Demo from "./components/Demo";

function App() {
  return (
    // <div>
    //   <Demo/>
    // </div>
    <BrowserRouter>
    <SalesOrderProvider>
      <Routes>
        <Route path="/" element={<MainTab />}>
          <Route element={<Entry />} />
          <Route element={<Details />} />
        </Route>
      </Routes>
    </SalesOrderProvider>
  </BrowserRouter>
  );
}

export default App;
