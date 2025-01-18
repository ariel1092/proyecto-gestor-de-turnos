/* eslint-disable no-unused-vars */
// Turno.js
import { useContext} from "react";
import Styles from "./Turno.module.css";
import PropTypes from "prop-types";
import { UserContext } from "../../context/UsersContext";
import Swal from "sweetalert2";

const Turno = ({ id, date, time, status}) => {
const {cancelAppoinments} = useContext(UserContext)


  
  const handleCancel =async () => {
   try {
    await cancelAppoinments(id)
    Swal.fire({
      icon:"warning",
      color:"red",
      title:"Turno cancelado"
    })
   } catch (error) {
    Swal.fire({
      icon:"error",
      title:"Error al cancelar el turno"
    })
   }
  };

  return (
    <div className={Styles.appointmentCard}>
      <div className={Styles.appointmentHeader}>
        <h3>Turno #{id}</h3>
        <span
          className={
            status === "active" ? Styles.statusActive : Styles.statusInactive
          }
        >
          {status}
        </span>
      </div>
      <div className={Styles.appointmentDetails}>
        <p>
          <strong>Fecha:</strong> <span>{date}</span>
        </p>
        <p>
          <strong>Hora:</strong> <span>{time}</span>
        </p>
      </div>
      <button className={` ${Styles.cancelButton} ${status === "cancelled" ? Styles.disable : ""}`}
      
      onClick={handleCancel}
      disabled= {status === "cancelled"}
      >
        Cancelar
      </button>
    </div>
  );
};

Turno.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Turno;

