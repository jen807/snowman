import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Snowman from "./pages/Snowman";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:cityName" element={<Detail />} />
        <Route path="/snowman" element={<Snowman />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
