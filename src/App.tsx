import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateRoute from "./pages/CreateRoute/CreateRoute";
import Layout from "./components/Layout/Layout";
import SearchedRoutes from "./pages/SearchedRoutes/SearchedRoutes";
import RouteDetail from "./pages/RouteDetail/RouteDetail";
import SharedRoute from "./pages/SharedRoute/SharedRoute";
import HowItWorks from "./pages/HowItWorks/HowItWorks";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create/route" element={<CreateRoute />} />
        <Route path="/searched/routes" element={<SearchedRoutes />} />
        <Route path="/route/details" element={<RouteDetail />} />
        <Route path="/shared/:shareId" element={<SharedRoute />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="*" element={<h5>Not found</h5>} />
      </Route>
    </Routes>
  );
}

export default App;
