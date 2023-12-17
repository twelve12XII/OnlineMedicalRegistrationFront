import { useState } from "react"
import { Doctor_card } from "../Doctor_card/Doctor_card"
import { DropDown } from "../../Interfaces/DropDown/DropDown"
import { postRequestOleg } from "../../Interfaces/api/constants"
import { Pagination } from "../../Interfaces/Pagination/Pagination"

export const Search_doctor = ({ data, orgList, specList, pageCount, setData,
    setPageCount, RecordsView, setRecordsView, setDoctorId, doctorId, setDoctor }) => {

    const [searchText, setSearchText] = useState('');
    const [org, setOrg] = useState()
    const [spec, setSpec] = useState()
    const [pageIndex, setPageIndex] = useState(0)
    const [canPreviousPage, setCanPreviousPage] = useState(false)
    const [canNextPage, setCanNextPage] = useState(pageIndex + 1 == Math.ceil(pageCount / 10))
    
    const handleClick = e => {
        const id = e.target.id
        postRequestOleg('records',
            {
                "doctorId": id,
                "pageNumber": 0
            }).then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            setDoctor(res)
                            setRecordsView(true)
                            if (doctorId === id) setRecordsView(!RecordsView)
                            setDoctorId(id)
                        })
                    } else {
                        console.log("exception " + response.status);
                    }
                })
    }

    const handleSearch = (pageIndex) => {
        console.log({
            "name": searchText != '' ? searchText.toLowerCase() : "EMPTY_VALUE",
            "organization": org ? org.toLowerCase() : "EMPTY_VALUE",
            "specialization": spec ? spec.toLowerCase() : "EMPTY_VALUE",
            "indexFrom": pageIndex * 10
        })
        postRequestOleg('search',
            {
                "name": searchText != '' ? searchText.toLowerCase() : "EMPTY_VALUE",
                "organization": org ? org.toLowerCase() : "EMPTY_VALUE",
                "specialization": spec ? spec.toLowerCase() : "EMPTY_VALUE",
                "indexFrom": pageIndex * 10
            }).then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            console.log(res)
                            setData(res.doctors)
                            setPageCount(Math.ceil(res.count / 10))
                            pageIndex + 1 == Math.ceil(res.count / 10) ? setCanNextPage(false) : setCanNextPage(true)
                            pageIndex == 0 ? setCanPreviousPage(false) : setCanPreviousPage(true)
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
                                <button onClick={() => handleSearch(pageIndex)}>Найти</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((doctor) => (doctor.name).toLowerCase().includes(searchText) && (
                            <tr key={doctor.name} className="doctor-list_item">
                                <th>{doctor.name.toUpperCase()}</th>
                                <th>{doctor.organization.toUpperCase()}</th>
                                <th>{doctor.specialization.toUpperCase()}</th>
                                <th><button onClick={handleClick} id={doctor.id} name="doctors">Записаться</button></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    pageCount={pageCount}
                    gotoPage={handleSearch}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    canNextPage={canNextPage}
                    canPreviousPage={canPreviousPage}
                />
            </div>
        </>
    )
}