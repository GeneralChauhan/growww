import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import Pagination from '../../components/Pagination';
import './style.css';

const URL = "https://vast-shore-74260.herokuapp.com/banks?city=";

const Homepage = () => {
    const navigate = useNavigate();

    const [banks, setBank] = useState([]);
    const [bankCategory,setBankCategory] = useState("All Banks");
    const [banksOrig, setBankOrig] = useState([]);
    const [city, setCity] = useState("GOA");
    const [category, setCategory] = useState('bank_name');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [banksPerPage] = useState(10);

    const cities = [{ name: 'GOA', value: 'GOA' }, { name: 'NEW DELHI', value: 'NEWDELHI' }, { name: 'MAINPURI', value: 'MAINPURI' }, { name: 'MEERUT', value: 'MEERUT' },{ name: 'AGRA', value: 'AGRA' }];
    const categories = [{ name: 'Bank', value: 'bank_name' }, { name: 'IFSC', value: 'ifsc' }, { name: 'Branch', value: 'branch' }, { name: 'ID', value: 'bank_id' }, { name: 'Address', value: 'address' }]
    
    // Get current posts
    const indexOfLastBank = currentPage * banksPerPage;
    const indexOfFirstBank = indexOfLastBank - banksPerPage;
    
    useEffect(() => {
        setBank([]);
        setCategory(['bank_name'])
        setCurrentPage(1)
        const fetchData = async () => {
            try {
                setLoading(true);
                fetch(URL + city)
                    .then((res) => res.json())
                    .then((res) => {
                        // console.log(res);
                        setBank(res);
                        setBankOrig(res);
                        setLoading(false);
                    })
            }
            catch (error) {
                console.log("error : ", error)
            }
        };

        fetchData();
    }, [city]);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    //Change City
    const cityChangeHandler = (newCity) => {
        setCity(newCity);
    }

    //Change category
    const categoryChangeHandler = (newCat) => {
        setCategory(newCat);
    }

    //Searching and Filtering Items
    const searchHandler = (event) => {
        // console.log(event.target.value);
        const filteredBank = banksOrig.filter((bank,index) => {
            // console.log(bank,category);
            if(category=='bank_name'){
                return (bank.bank_name.toString().toLowerCase().includes(event.target.value.toLowerCase())) ? bank : null;
            }
            else if(category=='ifsc'){
                return (bank.ifsc.toString().toLowerCase().includes(event.target.value.toLowerCase())) ? bank : null;
            }
            else if(category=='bank_id'){
                return (bank.bank_id.toString().toLowerCase().includes(event.target.value.toLowerCase())) ? bank : null;
            }
            else if(category=='branch'){
                return (bank.branch.toString().toLowerCase().includes(event.target.value.toLowerCase())) ? bank : null;
            }
            else if(category=='address'){
                return (bank.address.toString().toLowerCase().includes(event.target.value.toLowerCase())) ? bank : null;
            }
            else{
                return bank;
            }
        })

        setBank(filteredBank)
    }

    //Favorite
    const favoriteAdder = (element) => {
        navigate(`/all-banks`);
        const newBank = banks;
        if(element.favorite){
            const index= banks.findIndex(ele => ele==element);
            newBank[index] = {...newBank[index],favorite:false};
        }
        else{
            const index= banks.findIndex(ele => ele==element);
            newBank[index] = {...newBank[index],favorite:true};
        }
        
        setBank(newBank);
    }

    const favToggler = () => {
        if(bankCategory=="All Banks"){
            setBankCategory("Favorite");
            setCurrentPage(1);
        }
        else{
            setBankCategory("All Banks");
            setCurrentPage(1);
        }
    }

    return (
        <div>
            <div className='topNav'>
                <div className={bankCategory=="All Banks" ? 'navItem fav' : 'navItem'} onClick={favToggler}>All Banks</div>
                <div className={bankCategory=="Favorite" ? 'navItem fav' : 'navItem'} onClick={favToggler}>Favorites</div>
            </div>
            <div className='head1'>
                <h1>All Banks</h1>
                <p>{bankCategory=="All Banks" ? `${banks.length} Banks` : `${banks.filter((ele)=>(ele.favorite)).length} Banks`}</p>
            </div>
            <div className='cont2'>
                <div className=" col-8 ">
                    <div className="search mx-3 p-2">
                        <label htmlFor="search1">
                            <svg role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24" aria-labelledby="searchIconTitle" stroke="#6C6C6C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="miter" fill="none" color="#2329D6"> <title id="searchIconTitle">Search</title> <path d="M14.4121122,14.4121122 L20,20" /> <circle cx="10" cy="10" r="6" /> </svg>
                        </label>
                        <input type="text" id='search1' className='searchInput' placeholder='Search' onChange={searchHandler}/>
                    </div>
                </div>
                <div className="col-2">
                    <div className="dropdown px-2">
                        <Dropdown
                            title={cities[cities.findIndex(i => i.value == city)].name}
                            items={cities}
                            toggle={cityChangeHandler}
                        />
                    </div>
                </div>
                <div className="col-2">
                    <div className="dropdown px-2">
                        <Dropdown
                            title={categories[categories.findIndex(i => i.value == category)].name}
                            items={categories}
                            toggle={categoryChangeHandler}
                        />
                    </div>
                </div>
            </div>
            <div className='table1'>
                <table style={{width:"100%",height:"20vh !important",overflow:'scroll'}}>
                    <tr className='tableHead'>
                        <th className='headItem title'></th>
                        <th className='headItem title'>Bank</th>
                        <th className='headItem title'>IFSC</th>
                        <th className='headItem title'>Branch</th>
                        <th className='headItem title'>ID</th>
                        <th className='headItem title'>Address</th>
                    </tr>
                    {loading ? 
                        <div>Loading</div>
                    :
                        bankCategory=="All Banks" 
                        ? 
                        banks.slice(indexOfFirstBank,indexOfLastBank).map((ele, ind) => {
                            return (
                                <tr className='tableHead tdata' key={ind}>
                                    <td className='headItem' onClick={() => favoriteAdder(ele)}>{ele.favorite ? <i className="fa fa-heart"></i> : <i className="fa-regular fa-heart"></i>}</td>
                                    <td className='headItem' >{ele.bank_name}</td>
                                    <td className='headItem' >{ele.ifsc}</td>
                                    <td className='headItem' >{ele.branch}</td>
                                    <td className='headItem' style={{textAlign:'center'}} >{ele.bank_id}</td>
                                    <td className='headItem' >{ele.address}</td>
                                </tr>
                            )
                        })
                        :
                        banks.filter((ele) => (ele.favorite)).slice(indexOfFirstBank,indexOfLastBank).map((ele, ind) => {
                            return (
                                <tr className='tableHead tdata' key={ind}>
                                    <td className='headItem' onClick={() => favoriteAdder(ele)}>{ele.favorite ? <i className="fa fa-heart"></i> : <i className="fa-regular fa-heart"></i>}</td>
                                    <td className='headItem' >{ele.bank_name}</td>
                                    <td className='headItem' >{ele.ifsc}</td>
                                    <td className='headItem' >{ele.branch}</td>
                                    <td className='headItem' style={{textAlign:'center'}} >{ele.bank_id}</td>
                                    <td className='headItem' >{ele.address}</td>
                                </tr>
                            )
                        })
                    
                    }
                </table>
            </div>
            <div className='paginationMain'>
                <Pagination
                    banksPerPage={banksPerPage}
                    totalBanks={bankCategory=="All Banks" ? banks.length : banks.filter((ele)=>(ele.favorite)).length}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}

export default Homepage;