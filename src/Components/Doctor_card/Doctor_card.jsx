import { postRequestOleg, postRequestEgor } from "../../Interfaces/api/constants"
import { useState } from "react";
import { Modal } from '../../Interfaces/Modal/Modal'

export const Doctor_card = ({ doctorId, doctor, userId }) => {
    const [time, setTime] = useState()
    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)
    const handleOpenModal = e => {
        const id = e.target.id
        setTime(document.getElementById(id).innerHTML)
        setModal(true)
    }
    const handleRecord = e => {
        const id = e.target.id
        setModal(false)
        console.log(doctor)
        console.log("doctorId" + doctorId,
            "fiO" + doctor.name,
            "specialization" + doctor.specialization,
            "organization" + doctor.organization,
            "userId" + userId,
            "time" + time)
        postRequestEgor('AddRecord',
            {
                "doctorId": doctorId,
                "fiO": doctor.name,
                "specialization": doctor.specialization,
                "organization": doctor.organization,
                "userId": userId,
                "time": time
            }
        ).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        console.log(res)
                    })
                } else {
                    console.log("exception " + response.status);
                }
            })
        postRequestOleg('create_record',
            {
                "recordId": id,
                "doctorId": doctorId
            }).then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            console.log(res)

                        })
                    } else {
                        console.log("exception " + response.status);
                    }
                })
    }

    return (
        <div className={'record'}>
            <h2>Doctor info</h2>
            <p>Name: {doctor.name.toUpperCase()}</p>
            {doctor.availableRecords && doctor.availableRecords.map((doctor) =>
                <button onClick={handleOpenModal} id={doctor.id} key={doctor.id}>{doctor.time}</button>
            )}

            <Modal
                visible={isModal}
                title={`Записаться к ${doctor.name.toUpperCase()}`}
                content={
                    <>
                        Ко времени {time}
                    </>
                }
                footer={<button type="button" onClick={handleRecord}>Записаться</button>}
                onClose={onClose}
            />
        </div>
    )
}