

import { useContext, useEffect} from "react";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Styles from "./App.module.css";
import Home from "./views/Home/Home";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./views/NotFound/NotFound";
import { UserContext } from "./context/UsersContext";
import AgendarTurno from "./components/AgendarTurno/AgendarTurno";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const publicRoutes = ["/login", "/register"];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!user && !isPublicRoute) {
      // Redirige a /login si no hay usuario y se intenta acceder a una ruta protegida
      navigate("/login");
    } else if (user && isPublicRoute) {
      // Redirige a home si el usuario ya está logueado pero está en una ruta pública
      navigate("/");
    }
  }, [location.pathname, user, navigate]);

  return (
    <div className={Styles.app}>
      {!user ? (
        <main className={Styles.container}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} /> {/* Redirige a NotFound */}
          </Routes>
        </main>
      ) : (
        <>
          <header>
            <span>LOGO</span>
            <Navbar />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/misturnos" element={<MisTurnos />} />
              <Route path="/agendarturno" element={<AgendarTurno />} />
              <Route path="*" element={<NotFound />} /> {/* Redirige a NotFound */}
            </Routes>
          </main>
        </>
      )}
    </div>
  );
};

export default App;
