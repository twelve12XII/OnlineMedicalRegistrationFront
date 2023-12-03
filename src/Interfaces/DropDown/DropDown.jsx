import React, { useState, useRef, useEffect } from "react";
import styles from "./DropDown.module.scss"

export const DropDown = ({
    name,
    items,
    setValue
}) => {

    const [dropDownState, setDropDownState] = useState({ open: false });
    const container = useRef();
    const [dropDownItem, setDropDownItem] = useState();

    const handleDropdownClick = (e) => {
        setDropDownState({ open: !dropDownState.open });
        setDropDownItem(e.target.innerHTML);
        setValue(e.target.innerHTML);
    }

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setDropDownState({ open: false });
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, []);

    return (
        <div key={name} className={styles.dropdown_container} ref={container}>
            <p>{name}</p>
            <div key='dropDownList' className={styles.dropdown_container__list}>
                <button key={dropDownItem} type="button" onClick={handleDropdownClick}>
                    {dropDownItem}
                </button>
                {
                    dropDownState.open && (items.map((item) => (
                        item !== dropDownItem &&
                        <button type="button" className={styles.btn_lock} onClick={handleDropdownClick}>
                            {item}
                        </button>

                    ))
                    )
                }
            </div>
        </div>
    )
}