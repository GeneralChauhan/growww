import React, { useState } from  'react';
import FontAwesome from 'react-fontawesome';
import './style.css'

const Dropdown = ({ items , title, toggle }) => {
    const [listOpen,setListOpen] = useState(false);
    const [dropwdownTitle,setDropwdownTitle] = useState(title);

    const toggleList = () => {
        setListOpen(!listOpen);
    }

    return(
        <div className="dd-wrapper">
            <button
                type="button"
                className="dd-header"
                onClick={toggleList}
            >
                <div className="dd-header-title">{dropwdownTitle}</div>
                {
                    listOpen ? 
                    <FontAwesome name="angle-up" size="2x" />
                    : 
                    <FontAwesome name="angle-down" size="2x" />
                }
            </button>
            {listOpen ?  (
                <div className="dd-list">
                    {items.map((item,index) => (
                        <button
                            type="button"
                            className="dd-list-item"
                            key={index}
                            onClick={() => {
                                toggle(item.value)
                                setDropwdownTitle(item.name)
                                setListOpen(!listOpen)
                            }}
                            >
                            {item.name}
                        </button>
                    ))}
                </div>
                )
                :
                null
            }
        </div>
    )
}

export default Dropdown;