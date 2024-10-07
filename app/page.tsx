"use client"

import { useState } from 'react';

export default function Home() {

  

  
  
  const [arr, setArr] = useState<Date[]>([]);
  const [bool, setBool] = useState(false);
  const [today, setToday] = useState<Date>(new Date());
  const [first, setFirst] = useState<Date>(new Date());
  const [prev, setPrev] = useState<Date>(new Date());
  const [active, setActive] = useState<Date>(new Date());
  const test = new Date();
  

  
  const clickHandle = () => {
    setArr([]);
    const tempArr: Date[] = [];
    
    //Set first day of current month  
    const makeFirstDay = prev.setDate(1);
    const makeFirstDayDate = new Date(makeFirstDay);
    const makeFirstMonth = makeFirstDayDate.setMonth(makeFirstDayDate.getMonth());
    const makeFirst = new Date(makeFirstMonth);
    setPrev(makeFirst);

    let firstDay = prev.getDay();
    const prevDate = prev;

    //loop to add tail end days of previous month
    while(firstDay){
      const prevDateMS = prevDate.setDate(prevDate.getDate() - 1);
      const prevDateDay = new Date(prevDateMS);
      tempArr.unshift(prevDateDay)
      firstDay--; 
    }

      //Set first day of current month 
      const makeFirstDay2 = first.setDate(1);
      const makeFirstDayDate2 = new Date(makeFirstDay2);
      const makeFirstMonth2 = makeFirstDayDate2.setMonth(makeFirstDayDate2.getMonth());
      const makeFirst2 = new Date(makeFirstMonth2);
      setFirst(makeFirst2);
      const currentDates = first;
      let currentBool = false;

      //loop to fill rest of calendar
      while(tempArr.length < 35){
        let currentDatesMS = 0;
        if(!currentBool){
           currentDatesMS = currentDates.setDate(currentDates.getDate());
           currentBool = !currentBool;
        }
        else{

          currentDatesMS = currentDates.setDate(currentDates.getDate() + 1);
        }
        
        const currentDatesDay = new Date(currentDatesMS);
        tempArr.push(currentDatesDay);
      }
     
    
    setArr(tempArr);
    setBool(true);
    
  };

  //view previous month
  const clickHandlePast = () => {
    const todayMinusMonthMS = today.setMonth(today.getMonth() - 1);
    const todayMinusMonth = new Date(todayMinusMonthMS);
    setToday(todayMinusMonth);

    const testMinusMonthMS = prev.setMonth(prev.getMonth() - 1);
    const testMinusMonth = new Date(testMinusMonthMS);
    setPrev(testMinusMonth);

    const firstMinusMonthMS = first.setMonth(first.getMonth() - 1);
    const firstMinusMonth = new Date(firstMinusMonthMS);
    setFirst(firstMinusMonth);

    clickHandle();
    
    
  }
  
  //view next month
  const clickHandleFuture = () => {
    const todayMinusMonthMS = today.setMonth(today.getMonth() + 1);
    const todayMinusMonth = new Date(todayMinusMonthMS);
    setToday(todayMinusMonth);

    const testMinusMonthMS = prev.setMonth(prev.getMonth() + 1);
    const testMinusMonth = new Date(testMinusMonthMS);
    setPrev(testMinusMonth);

    const firstMinusMonthMS = first.setMonth(first.getMonth() + 1);
    const firstMinusMonth = new Date(firstMinusMonthMS);
    setFirst(firstMinusMonth);

    clickHandle();
    
  }
  
  //header stuff
const headerDate = new Date(today);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = months[headerDate.getMonth()];
const year = headerDate.getFullYear();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const clickActive = (date: Date) => {
  setActive(date);
}

  return (
   <div className='cont'>
      <a className='startBtn' onClick={clickHandle}>Start</a>
      <div className='headerMonth'>
        <h1>{year}</h1>
        <div className='monthControls'>
          <a className='btn' onClick={clickHandlePast}>&lt;</a>
          <h1>{month}</h1>
          <a className='btn' onClick={clickHandleFuture}>&gt;</a>
        </div>
        <h1>{active.toLocaleDateString('en-US')}</h1>
      </div>
      <div className='calCont'>
        {daysOfWeek.map((day, i) => (<h2 key={i}>{day}</h2>))}
        {bool 
        ? arr.map((item, index) => (
        <div 
        onClick={() => clickActive(item)}
          className={item.getDate() === test.getDate() && item.getMonth() === test.getMonth() ? 'calItemToday' : 'calItem' } 
          key={index}>
            <div className={active === item ? 'calItemTodayActive' : 'calItem'}>
            <p className={item.getMonth() === today.getMonth() ? 'activeMonth' : 'inactiveMonth'}>
              {item.getDate()}
            </p>
            </div>
          </div>)) 
          : <></>}
      </div>
      
   </div>
  );
}
