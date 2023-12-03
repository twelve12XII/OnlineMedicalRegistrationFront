import { useState } from "react"
import { postRequest } from "../../Interfaces/api/constants"
import { History_visits } from "../History_visits/History_visits"
import { Search_doctor } from "../Search_doctor/Search_doctor"
import { Profile } from "../Profile/Profile"
import norm_style from "../normalize.module.scss"

export const Online_medical = () => {
    const [historyVisitsLoad, setHistoryVisitsLoad] = useState(false)
    const [searchDoctorLoad, setSearchDoctorLoad] = useState(false)
    const [profileLoad, setProfileLoad] = useState(true);
    const [doctorsList, setDoctorsList] = useState([])
    const [visitsList, setVisitsList] = useState([])
    const [orgList, setOrgList] = useState([])
    const [specList, setSpecList] = useState([])

    const handleHistoryVisits = () => {
        setProfileLoad(false)
        setSearchDoctorLoad(false)
        !historyVisitsLoad ? postRequest('https://7ab1-46-138-0-220.ngrok-free.app/Home/SearchHistory',
            {
                "Id": 1,
                "FIO": "EMPTY_VALUE",
                "Specialization": "d",
                "Organization": "EMPTY_VALUE",
                "IndexFrom": 0
            }
        ).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        setHistoryVisitsLoad(!historyVisitsLoad)
                        setVisitsList(res)
                        console.log(res)
                    })
                } else {
                    console.log("exception " + response.status);
                }
            }) : setHistoryVisitsLoad(!historyVisitsLoad)
    }

    const handleProfile = () => {
        setProfileLoad(!profileLoad)
        setHistoryVisitsLoad(false)
        setSearchDoctorLoad(false)
    }
    const handleSearchDoctor = () => {
        setProfileLoad(false)
        setSearchDoctorLoad(false)
        !searchDoctorLoad ? (postRequest('https://1e21-93-188-41-71.ngrok-free.app/all_doctors',
            {
                "indexFrom": 0
            }).then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            setSearchDoctorLoad(!searchDoctorLoad)
                            setDoctorsList(res.doctors)
                            console.log(res)
                        })
                    } else {
                        console.log("exception " + response.status);
                    }
                }),
            postRequest('https://1e21-93-188-41-71.ngrok-free.app/organizations',
                '').then(
                    response => {
                        if (response.ok) {
                            response.json().then(res => {
                                setOrgList(res.organizations)
                                console.log(res)
                            })
                        } else {
                            console.log("exception " + response.status);
                        }
                    }),
            postRequest('https://1e21-93-188-41-71.ngrok-free.app/specializations',
                '').then(
                    response => {
                        if (response.ok) {
                            response.json().then(res => {
                                setSpecList(res.specializations)
                                console.log(res)
                            })
                        } else {
                            console.log("exception " + response.status);
                        }
                    })
        ) : setSearchDoctorLoad(!searchDoctorLoad)


    }

    return (
        <div className={norm_style.container}>
            <div className="menu">
                <div className="btn-profile">
                    <button onClick={handleProfile}>Мой профиль</button>
                </div>
                <div className="history-visits">
                    <button onClick={handleHistoryVisits}>История посещений</button>
                </div>
                <div className="search-doctor">
                    <button onClick={handleSearchDoctor}>Поиск доктора</button>
                </div>
            </div>
            <div className="content">
                {historyVisitsLoad && <History_visits data={visitsList} />}
                {searchDoctorLoad && <Search_doctor data={doctorsList} orgList={orgList} specList={specList} />}
                {profileLoad && <Profile policy={'12312313'} />}
            </div>
        </div>
    )
}