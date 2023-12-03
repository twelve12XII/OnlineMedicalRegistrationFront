import React from 'react'

export const Pagination = ({
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
    pageSize,
    setPageSize
}) => {
    // метод перехода к первой странице
    const gotoFirstPage = () => gotoPage(0)
    // метод перехода к последней странице
    const gotoLastPage = () => gotoPage(pageCount - 1)
    // метод перехода к указанной странице
    const gotoPage = (e) => {
        // индекс массива
        const page = e.target.value ? e.target.value - 1 : 0
        gotoPage(page)
    }
    // метод установки размера страницы
    const setPageSize = (e) => {
        const size = e.target.value
        setPageSize(size)
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 1rem'
            }}
        >
            <span>
                <button onClick={gotoFirstPage} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={previousPage} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <span>
                    Page {pageIndex + 1} of {pageCount}
                </span>
                <button onClick={nextPage} disabled={!canNextPage}>
                    {'>'}
                </button>
                <button onClick={gotoLastPage} disabled={!canNextPage}>
                    {'>>'}
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