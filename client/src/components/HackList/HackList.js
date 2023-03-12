import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addHack } from '../../Redux/actions/actionHack/actionHack';
import HackCard from '../HackCard/HackCard'

function HackList() {
  const list = useSelector(state => state.hackReducer.hacks)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addHack());
  }, [dispatch, list]);

  return (
    <>
      <div className='flex'>
        {list.map(el => <HackCard key={el._id} el={el}  />)}
      </div>
    </>
  )
}

export default HackList;
