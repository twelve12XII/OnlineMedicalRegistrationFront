import { useEffect, useState } from 'react'
import { DropDown } from '../../Interfaces/DropDown/DropDown'
import { postRequestEgor, postRequestOleg } from '../../Interfaces/api/constants'
import { Pagination } from '../../Interfaces/Pagination/Pagination'
import { Modal } from '../../Interfaces/Modal/Modal'
import style from "./History_visits.module.scss"

export const History_visits = ({ data, specList, orgList, userId, pageCount, setPageCount, setData }) => {
    const [org, setOrg] = useState()
    const [time, setTime] = useState()
    const [spec, setSpec] = useState()
    const [searchText, setSearchText] = useState('')
    const [pageIndex, setPageIndex] = useState(0)
    const [canPreviousPage, setCanPreviousPage] = useState(false)
    const [canNextPage, setCanNextPage] = useState(pageCount > 10)
    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)
    const [doctorName, setDoctorName] = useState()
    const [id, setId] = useState()
    const handleOpenModal = (time, id, name) => {
        setTime(time)
        setId(id)
        setModal(true)
        setDoctorName(name)
    }

    const handleCancel = () => {
        postRequestEgor('CancelRecord',
            {
                "recordId": id
            }).then(
                response => {
                    if (response.ok) {
                        console.log(response.status)
                    } else {
                        console.log("exception " + response.status);
                    }
                })
        postRequestOleg('verify_cancel',
            {
                "time": time
            }).then(
                response => {
                    if (response.ok) {
                        console.log(response.status)
                    } else {
                        console.log("exception " + response.status);
                    }
                })
        onClose()

    }
    const handleSearch = (pageIndex) => {
        console.log({
            "name": searchText != '' ? searchText.toLowerCase() : "EMPTY_VALUE",
            "organization": org ? org.toLowerCase() : "EMPTY_VALUE",
            "specialization": spec ? spec.toLowerCase() : "EMPTY_VALUE",
            "indexFrom": pageIndex * 10
        })
        postRequestEgor('SearchHistory',
            {
                "id": userId,
                "fIO": searchText != '' ? searchText.toLowerCase() : "EMPTY_VALUE",
                "specialization": spec ? spec.toLowerCase() : "EMPTY_VALUE",
                "organization": org ? org.toLowerCase() : "EMPTY_VALUE",
                "indexFrom": pageIndex * 10
            }).then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            console.log(res)
                            setData(res.responses)
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
        <main>
            <div className={style.history}>
                <div className={style.table_header}>
                    <div className={style.table_header_item + " " + style.fio_item}>
                        <label htmlFor="fio">ФИО</label>
                        <input name="fio" type="text" placeholder="ФИО" onInput={e => setSearchText(e.target.value.toLowerCase())} />
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
                        {data && data.map((visit) => (visit.fio).toLowerCase().includes(searchText) && (
                            <tr key={visit.fio} className={style.doctor_list_item}>
                                <th>{visit.fio.toUpperCase()}</th>
                                <th>{visit.organizationName.toUpperCase()}</th>
                                <th>{visit.spezialization.toUpperCase()}</th>
                                <th>{visit.dateTime}</th>
                                <th>{visit.status.toUpperCase()}</th>
                                {visit.status == 'предстоит' && <th className={style.cancel_record_button}><button onClick={() => handleOpenModal(visit.dateTime, visit.recordId, visit.fio)} id={visit.recordId} name={visit.fio}>Отменить запись</button></th>}
                            </tr>
                        ))}
                        <Modal
                            visible={isModal}
                            title={`Отменить запись к ${doctorName}`}
                            content={
                                <>
                                    Ко времени {time}
                                </>
                            }
                            footer={<button type="button" onClick={handleCancel}>Отменить</button>}
                            onClose={onClose}
                        />
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


    )
}