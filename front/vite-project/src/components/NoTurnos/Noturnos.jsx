
import styles from './NoTurnos.module.css';

const NoTurnos = () => {
  return (
    <div className={styles.noTurnosContainer}>
      <p className={styles.noTurnosMessage}>No hay turnos para mostrar</p>
    </div>
  );
};

export default NoTurnos;
