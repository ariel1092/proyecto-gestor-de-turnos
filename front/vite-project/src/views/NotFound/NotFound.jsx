

import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>404 - Página no encontrada</h2>
      <p className={styles.description}>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <button className={styles.homeButton}>
      <Link to={"/"} className={styles.homeButton}> Volver al Home 😔 </Link>
      </button>
    </div>
  );
};

export default NotFound;

