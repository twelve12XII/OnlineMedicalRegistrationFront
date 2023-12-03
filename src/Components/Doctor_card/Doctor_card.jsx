export const Doctor_card = ({ doctor }) => {

    return (
        <>
            <h2>Doctor info</h2>
            <p>Name: {doctor.name}</p>
            <p>Surname: {doctor.surname}</p>
            <p>Patronymic: {doctor.patronymic}</p>
            <button className="btn-appointment">Make an appointment with this doctor</button>
            <button className="btn-cancelAppointment">Cancel an appointment with this doctor</button>
        </>
    )
}