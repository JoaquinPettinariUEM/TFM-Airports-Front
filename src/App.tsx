import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateRoute from "./pages/CreateRoute/CreateRoute";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create/route" element={<CreateRoute />} />
      </Route>
    </Routes>
  );
}

export default App;
