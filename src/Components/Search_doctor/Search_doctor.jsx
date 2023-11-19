import { useState } from "react"
import { DoctorCard } from "../DoctorCard/DoctorCard"

export const Search_doctor = ({ data }) => {

    const [modalLoad, setModalLoad] = useState(false)
    const [doctorId, setDoctorId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const handleClick = e => {
        const id = e.target.id
        console.log(id)
        setModalLoad(true)
        if (doctorId === id) setModalLoad(!modalLoad)
        setDoctorId(id)
    }

    return (
        <>
            <div className="search-layout">
                <input type="text" placeholder="Search by name" onInput={e => setSearchText(e.target.value.toLowerCase())} />
            </div>
            <div key={'doctor-list'} className="doctor-list">
                {data && data.map((doctor) => (doctor.name + ' ' + doctor.surname + ' ' + doctor.patronymic).toLowerCase().includes(searchText) && (
                    <div key={doctor.name} className="doctor-list_item">
                        <button onClick={handleClick} id={doctor.doctorId} name="doctors">{doctor.name + ' ' + doctor.surname + ' ' + doctor.patronymic}</button>
                    </div>
                ))}
                {(doctorId && modalLoad) && (<DoctorCard doctor={data[doctorId - 1]} />)}
            </div>
        </>
    )
}