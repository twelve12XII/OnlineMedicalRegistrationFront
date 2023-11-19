import { useState } from "react"
import { postRequest } from "../Interfaces/api/constants"
import { History_visits } from "../History_visits/History_visits"
import { Search_doctor } from "../Search_doctor/Search_doctor"

export const Online_medical = () => {
    const [historyVisitsLoad, setHistoryVisitsLoad] = useState(false)
    const [searchDoctorLoad, setSearchDoctorLoad] = useState(false)
    const [doctorsList, setDoctorsList] = useState([])

    const handleHistoryVisits = () => {
        setHistoryVisitsLoad(!historyVisitsLoad)
    }

    const handleSearchDoctor = () => {

        !searchDoctorLoad ? postRequest('https://localhost:7136/Home/GetHistory', '').then(
            response => {
                if (response.ok) {
                    console.log('okk')
                    response.json().then(res => {
                        setSearchDoctorLoad(!searchDoctorLoad)
                        setDoctorsList(res)
                        console.log(res)
                    })
                } else {
                    console.log("exception " + response.status);
                }
            }) : setSearchDoctorLoad(!searchDoctorLoad)
    }

    return (
        <>
            <div className="header">
                <h2>Online medical</h2>
            </div>
            <div className="history-visits">
                <button onClick={handleHistoryVisits}>History of visits</button>
                {historyVisitsLoad && <History_visits />}
            </div>
            <div className="search-doctor">
                <button onClick={handleSearchDoctor}>Search for a doctor</button>
                {searchDoctorLoad && <Search_doctor data={doctorsList} />}
            </div>
        </>
    )
}