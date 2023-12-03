import { useEffect, useState } from 'react'
import { DropDown } from '../../Interfaces/DropDown/DropDown'
import { Visit_card } from '../Visit_card/Visit_card'
// import { Pagination } from '../../Interfaces/Pagination/Pagination'
export const History_visits = ({ data }) => {

    const [org, setOrg] = useState()
    const [spec, setSpec] = useState()

    return (
        <div>
            <h2>История посещений</h2>
            <div className='history'>
                <table>
                    <thead>
                        <tr className='table_layout'>
                            <th>
                                <input type="text" placeholder="ФИО" />
                            </th>
                            <th>
                                <DropDown
                                    name={'Организация'}
                                    items={['1', '2', '3']}
                                    setValue={setOrg}
                                />
                            </th>
                            <th>
                                <DropDown
                                    name={'Специализация'}
                                    items={['1', '2', '3']}
                                    setValue={setSpec}
                                />
                            </th>
                            <th>
                                <button>Найти</button>
                            </th>
                        </tr>
                        <tr className='table_head'>

                        </tr>
                    </thead>
                    <tbody>
                        <tr key="visit_card">
                            {data && data.map((visit) =>
                                <Visit_card
                                    fio={visit.fio}
                                    spezialization={visit.spezialization}
                                    organizationName={visit.organizationName}
                                    dateTime={visit.dateTime}
                                    status={visit.status}
                                />
                            )
                            }
                        </tr>
                        <tr>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>


    )
}