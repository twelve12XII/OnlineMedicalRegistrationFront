import { useState } from "react"
import { Doctor_card } from "../Doctor_card/Doctor_card"
import { DropDown } from "../../Interfaces/DropDown/DropDown"
import { postRequestOleg } from "../../Interfaces/api/constants"
import { Pagination } from "../../Interfaces/Pagination/Pagination"
import style from "./Search_doctor.module.scss"

export const Search_doctor = ({ data, orgList, specList, pageCount, setData,
    setPageCount, RecordsView, setRecordsView, setDoctorId, doctorId, setDoctor }) => {

    const [searchText, setSearchText] = useState('');
    const [org, setOrg] = useState()
    const [spec, setSpec] = useState()
    const [pageIndex, setPageIndex] = useState(0)
    const [canPreviousPage, setCanPreviousPage] = useState(false)
    const [canNextPage, setCanNextPage] = useState(pageCount > 10)
    
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
        <main>
            <div className={style.search_doctor}>
                <div className={style.table_header}>
                        <div className={style.table_header_item + " " + style.fio_item}>
                            <label htmlFor="fio">ФИО</label>
                            <input type="text" placeholder="ФИО" onInput={e => setSearchText(e.target.value.toLowerCase())} />
                        </div>
                        <div className={style.table_header_item}>
                            <DropDown
                            name={'Организация'}
                            items={orgList}
                            setValue={setOrg}
                            />
                        </div>
                        <div className={style.table_header_item}>
                        <DropDown
                                        name={'Специализация'}
                                        items={specList}
                                        setValue={setSpec}
                                    />
                        </div>
                        <div className={style.table_header_item}>
                            <button className={style.search_button} onClick={() => handleSearch(pageIndex)}>Найти</button>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            {data && data.map((doctor) => (doctor.name).toLowerCase().includes(searchText) && (
                                <tr key={doctor.name}  className={style.doctor_list_item}>
                                    <th>{doctor.name.toUpperCase()}</th>
                                    <th>{doctor.organization.toUpperCase()}</th>
                                    <th>{doctor.specialization.toUpperCase()}</th>
                                    <th><button className={style.record_button} onClick={handleClick} id={doctor.id} name="doctors">Записаться</button></th>
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
            </main>
        </>
    )
}