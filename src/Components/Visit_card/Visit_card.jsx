export const Visit_card = ( {
        fio,
        spezialization,
        organizationName,
        dateTime,
        status
    }) => {
    return (
        <>
            <td>
                {fio}
            </td>
            <td>
                {spezialization}
            </td>
            <td>
                {organizationName}
            </td>
            <td>
                {dateTime}
            </td>
            <td>
                {status}
            </td>
            <td>
                <button>Отменить запись</button>
            </td>
        </>
    )
}