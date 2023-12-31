import { useState } from "react"
import { postRequestEgor, postRequestOleg } from "../../Interfaces/api/constants"
import { History_visits } from "../History_visits/History_visits"
import { Search_doctor } from "../Search_doctor/Search_doctor"
import { Profile } from "../Profile/Profile"
import norm_style from "../normalize.module.scss"
import { Doctor_card } from "../Doctor_card/Doctor_card"
import { useLocation } from "react-router-dom"

export const Online_medical = () => {
    const [historyVisitsLoad, setHistoryVisitsLoad] = useState(false)
    const [searchDoctorLoad, setSearchDoctorLoad] = useState(false)
    const [profileLoad, setProfileLoad] = useState(true);
    const [doctorsList, setDoctorsList] = useState([])
    const [visitsList, setVisitsList] = useState([])
    const [orgList, setOrgList] = useState([])
    const [specList, setSpecList] = useState([])
    const [pageCount, setPageCount] = useState()
    const [recordsView, setRecordsView] = useState(false)
    const [doctorId, setDoctorId] = useState()
    const { state } = useLocation();
    const [doctor, setDoctor] = useState()

    const handleHistoryVisits = () => {
        console.log(state.policy)
        setProfileLoad(false)
        setSearchDoctorLoad(false)
        !historyVisitsLoad ? (postRequestEgor('SearchHistory',
            {
                "Id": state.policy,
                "FIO": "EMPTY_VALUE",
                "Specialization": "EMPTY_VALUE",
                "Organization": "EMPTY_VALUE",
                "IndexFrom": 0
            }
        ).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        setHistoryVisitsLoad(!historyVisitsLoad)
                        setVisitsList(res.responses)
                        console.log(res)
                        setPageCount(Math.ceil(res.count / 10))
                    })
                } else {
                    console.log("exception " + response.status);
                }
            }),
            postRequestEgor('GetAllOrganizations', '').then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            console.log(res)
                            setOrgList(res)
                        })
                    } else {
                        console.log("exception " + response.status);
                    }
                }),
            postRequestEgor('GetAllSpecializations', '').then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            console.log(res)
                            setSpecList(res)
                        })
                    } else {
                        console.log("exception " + response.status);
                    }
                })
        ) : setHistoryVisitsLoad(!historyVisitsLoad)
    }

    const handleProfile = () => {
        setProfileLoad(!profileLoad)
        setHistoryVisitsLoad(false)
        setSearchDoctorLoad(false)
    }
    const handleSearchDoctor = () => {
        setProfileLoad(false)
        setHistoryVisitsLoad(false)
        !searchDoctorLoad ? (postRequestOleg('search',
            {
                "name": "EMPTY_VALUE",
                "organization": "EMPTY_VALUE",
                "specialization": "EMPTY_VALUE",
                "indexFrom": 0
            }).then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            setSearchDoctorLoad(!searchDoctorLoad)
                            setDoctorsList(res.doctors)
                            setPageCount(Math.ceil(res.count / 10))
                            console.log(res)
                        })
                    } else {
                        console.log("exception " + response.status);
                    }
                }),
            postRequestOleg('organizations',
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
            postRequestOleg('specializations',
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
            {recordsView == false ?
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
                :
                <div>
                    <Doctor_card
                        doctor={doctor}
                        doctorId={doctorId}
                        userId={state.policy}
                    />
                    <button onClick={() => setRecordsView(false)}>Назад</button>
                </div>
            }
            <div className="content">
                {historyVisitsLoad && <History_visits
                    data={visitsList}
                    orgList={orgList}
                    specList={specList}
                    userId={state.policy}
                    pageCount={pageCount}
                    setPageCount={setPageCount}
                    setData={setVisitsList}
                />}
                {searchDoctorLoad && <Search_doctor
                    data={doctorsList}
                    orgList={orgList}
                    specList={specList}
                    pageCount={pageCount}
                    setData={setDoctorsList}
                    setPageCount={setPageCount}
                    setRecordsView={setRecordsView}
                    recordsView={recordsView}
                    setDoctorId={setDoctorId}
                    doctorId={doctorId}
                    setDoctor={setDoctor}
                />}
                {profileLoad && <Profile policy={state.policy} />}
            </div>

        </div>
    )
}