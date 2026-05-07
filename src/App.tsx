import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateRoute from "./pages/CreateRoute/CreateRoute";
import Layout from "./components/Layout/Layout";
import SelectRoutes from "./pages/SelectRoutes/SelectRoutes";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create/route" element={<CreateRoute />} />
        <Route path="/my-routes" element={<SelectRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
