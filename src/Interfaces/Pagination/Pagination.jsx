import React, { useState } from 'react'
import style from "./Pagination.module.scss"

export const Pagination = ({
    gotoPage,
    pageCount,
    pageIndex,
    canNextPage,
    canPreviousPage,
    setPageIndex
}) => {

    // метод перехода к первой странице
    const gotoFirstPage = () => { gotoPage(0), setPageIndex(0) }
    // метод перехода к последней странице
    const gotoLastPage = () => { gotoPage(pageCount - 1), setPageIndex(pageCount - 1) }

    const previousPage = () => { gotoPage(pageIndex - 1), setPageIndex(pageIndex - 1) }

    const nextPage = () => { gotoPage(pageIndex + 1), setPageIndex(pageIndex + 1) }
    // метод установки размера страницы
    // const setPageSize = (e) => {
    //     const size = e.target.value
    //     setPageSize(size)
    // }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
            className={style.pagination_block}
        >
            <span className={style.pagination_span_left}>
                <button onClick={previousPage} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <span>
                    Page {pageIndex + 1} of {pageCount == 0?1:pageCount}
                </span>
                <button onClick={nextPage} disabled={!canNextPage}>
                    {'>'}
                </button>
            </span>
            {/* <label>
                Go to page:{' '}
                <input
                    type='number'
                    defaultValue={pageIndex + 1}
                    onChange={gotoPage}
                    style={{ width: '8ch' }}
                />
            </label>
            <select value={pageSize} onChange={setPageSize}>
                {[10, 20, 30].map((size) => (
                    <option value={size} key={size}>
                        Show {size}
                    </option>
                ))}
            </select> */}
        </div>
    )
}