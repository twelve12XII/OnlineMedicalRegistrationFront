export const Profile = (
    {
        policy
    }
) => {

    return(
        <div>
            <label>Номер полиса</label>
            <p>{policy}</p>
            <button>Выйти из аккаунта</button>
            <button>Удалить аккаунт</button>
        </div>
    )
}