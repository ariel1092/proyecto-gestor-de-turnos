


import { useContext, useEffect } from "react";
import Turno from "../../components/Turno/Turno";
import NoTurnos from "../../components/NoTurnos/Noturnos"; // Importar el nuevo componente
import Styles from "./MisTurnos.module.css";
import { UserContext } from "../../context/UsersContext";

const MisTurnos = () => {
  const { getUserAppoinments, user, userAppoinments } = useContext(UserContext);


  useEffect(() => {
    if (user && userAppoinments.length === 0) { 
      getUserAppoinments(user);
    }
  }, [getUserAppoinments, user, userAppoinments.length]);

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h1 className={Styles.title}>Mis Turnos</h1>
      </div>

      <div className={Styles.appointmentsContainer}>
        {userAppoinments && userAppoinments.length > 0 ? (
          userAppoinments.filter((turno) => turno.id && turno.date && turno.time)
          .map((turno) => (
          
            <Turno
            key={turno.id }
              id={turno.id}
              date={turno.date}
              time={turno.time}
              status={turno.status || "active"}
            />
            
          ))
        ) : (
          <NoTurnos /> 
        )}
      </div>
    </div>
  );
};

export default MisTurnos;
