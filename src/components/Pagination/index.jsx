import React from 'react';
import './style.css'

const Pagination = ({ banksPerPage, totalBanks, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBanks / banksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a href ="/#" onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;