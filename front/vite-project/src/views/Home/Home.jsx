import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <h2>Consultorio de Psicología</h2>
      <p className={styles.introText}>
        Bienvenido al consultorio de la Licenciada Fernanda Aballay. Ofrecemos un espacio seguro y confidencial para el bienestar emocional y mental.
      </p>
      <Link to="/agendarturno">
        <button className={styles.button}>Agendar Turno</button>
      </Link>
    </div>
  );
}

export default Home;


