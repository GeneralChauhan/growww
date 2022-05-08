import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './style.css'

const URL = "https://vast-shore-74260.herokuapp.com/banks?city=";

const Modal = ({match}) => {
    const [banks,setBank] = useState([]);
    const {city} = useParams();
    const {ifsc} = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                fetch(URL+city)
                    .then((res) => res.json())
                    .then((res) => {
                        // console.log(res);
                        setBank(res);
                    })
            }
            catch (error) {
                console.log("error : ", error)
            }
        };

        fetchData();
    }, []);

    return (
        <div className="modalCont">
            <div className='modalmain'>
                <div className="bank">
                    <i class="fa-solid fa-building"></i>
                    <div className="bankname">

                        <h2>{banks[banks.findIndex((item) => item.ifsc==ifsc)].bank_name}</h2>
                        <p>{ifsc}</p>
                    </div>
                </div>
                <div className="bankDetails">
                    <div className="detail">
                        <h5> BRANCH</h5>
                        <p> {banks[banks.findIndex((item) => item.ifsc==ifsc)].branch}</p>
                    </div>
                    <div className="detail">
                        <h5>BANK ID</h5>
                        <p> {banks[banks.findIndex((item) => item.ifsc==ifsc)].bank_id}</p>
                    </div>
                    <div className="detail address">
                        <i class="fa-solid fa-location-dot"></i>
                        <p> {banks[banks.findIndex((item) => item.ifsc==ifsc)].address}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal