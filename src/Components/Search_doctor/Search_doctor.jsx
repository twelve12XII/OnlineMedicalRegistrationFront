import { useState } from "react"
import { Doctor_card } from "../Doctor_card/Doctor_card"
import { DropDown } from "../../Interfaces/DropDown/DropDown"
import { postRequest } from "../../Interfaces/api/constants"

export const Search_doctor = ({ data, orgList, specList }) => {

    const [modalLoad, setModalLoad] = useState(false)
    const [doctorId, setDoctorId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [org, setOrg] = useState()
    const [spec, setSpec] = useState()

    const handleClick = e => {
        const id = e.target.id
        console.log(id)
        setModalLoad(true)
        if (doctorId === id) setModalLoad(!modalLoad)
        setDoctorId(id)
    }

    const handleSearch = () => {
        console.log({
            "name": searchText != '' ? searchText.toLowerCase() : "EMPTY_VALUE",
            "organization": org ? org.toLowerCase() : "EMPTY_VALUE",
            "specialization": spec ? spec.toLowerCase() : "EMPTY_VALUE",
            "indexFrom": 0
        })
        postRequest('https://1e21-93-188-41-71.ngrok-free.app/search',
            {
                "name": searchText != '' ? searchText.toLowerCase() : "EMPTY_VALUE",
                "organization": org ? org.toLowerCase() : "EMPTY_VALUE",
                "specialization": spec ? spec.toLowerCase() : "EMPTY_VALUE",
                "indexFrom": 0
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
        <>
            <h2>Доктора</h2>
            <div className='search_doctor'>
                <table>
                    <thead>
                        <tr className='table_layout'>
                            <th>
                                <input type="text" placeholder="ФИО" onInput={e => setSearchText(e.target.value.toLowerCase())} />
                            </th>
                            <th>
                                <DropDown
                                    name={'Организация'}
                                    items={orgList}
                                    setValue={setOrg}
                                />
                            </th>
                            <th>
                                <DropDown
                                    name={'Специализация'}
                                    items={specList}
                                    setValue={setSpec}
                                />
                            </th>
                            <th>
                                <button onClick={handleSearch}>Найти</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((doctor) => (doctor.name).toLowerCase().includes(searchText) && (
                            <tr key={doctor.name} className="doctor-list_item">
                                <th>{doctor.name.toUpperCase()}</th> 
                                <th>{doctor.organization.toUpperCase()}</th>
                                <th>{doctor.specialization.toUpperCase()}</th>
                                <th><button onClick={handleClick} id={doctor.doctorId} name="doctors">Записаться</button></th>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}