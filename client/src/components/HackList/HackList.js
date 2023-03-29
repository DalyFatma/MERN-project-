import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHack } from '../../Redux/actions/actionHack/actionHack';
import HackCard from '../HackCard/HackCard';

function HackList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hacks, setHacks] = useState([]);
  const list = useSelector((state) => state.hackReducer.hacks);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/hacks?page=${currentPage}`);
      const data = await response.json();
      setHacks(data.hacks);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    }
    fetchData();
  }, [currentPage, dispatch, list]);

  function handlePrevClick() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function handleNextClick() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  return (
    <>
      <div className='flex'>
        {hacks.map((el) => (
          <HackCard key={el._id} el={el} />
        ))}
      </div>
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevClick}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={handleNextClick}>
          Next
        </button>
      </div>
    </>
  );
}

export default HackList;
