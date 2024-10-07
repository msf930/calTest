"use client"

import { useState } from 'react';

export default function Home() {

  const [arr, setArr] = useState<Date[]>([]);
  const [bool, setBool] = useState(false);
  const [today, setToday] = useState<Date>(new Date());
  const [first, setFirst] = useState<Date>(new Date());
  const [prev, setPrev] = useState<Date>(new Date());
  const [activeArr, setActiveArr] = useState<Date[]>([]);
  const [activeFillArr, setActiveFillArr] = useState<string[]>([]);
  const [activeTerminusArr, setActiveTerminusArr] = useState<string[]>([]);
  const test = new Date();
  

  //opens calendar
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

  //view past month
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
  
  //view future month
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

//called by clickActive() below, creates array of dates between picked/ active days
const createActiveArr = (terminusArr: Date[]) => {
  const tempTerminusArr: string[] = [];
  const forHeaderArr: string[] = [];
  if(terminusArr.length == 1){
    tempTerminusArr.push(terminusArr[0].toLocaleDateString('en-US'));
    forHeaderArr.push(terminusArr[0].toLocaleDateString('en-US'))
    setActiveTerminusArr(forHeaderArr);
  }else if(terminusArr.length == 2){
    const firstMS = terminusArr[0].getTime();
    const secondMS = terminusArr[1].getTime();
    const terminusSortArr: number[] = [];
    terminusSortArr.push(firstMS);
    terminusSortArr.push(secondMS);
    terminusSortArr.sort((a, b) => a - b);
    const startDate = new Date(terminusSortArr[0]);
    const endDate = new Date(terminusSortArr[1]);
    const startHeadDate = startDate.toLocaleDateString('en-US')
    const endHeadDate = endDate.toLocaleDateString('en-US')
    forHeaderArr.push(startHeadDate);
    forHeaderArr.push(endHeadDate);
    setActiveTerminusArr(forHeaderArr);
    let startMS = terminusSortArr[0];
    const endMS = terminusSortArr[1];
    const firstDate = new Date(terminusSortArr[0]);
    const dayMS = 86400000;
    tempTerminusArr.push(firstDate.toLocaleDateString('en-US'));

    while(startMS < endMS){
      startMS += dayMS;
      const fillDate = new Date(startMS);
      tempTerminusArr.push(fillDate.toLocaleDateString('en-US'));
    }
    
    
  }
  
  setActiveFillArr(tempTerminusArr);
};

//pick date or dates
const clickActive = (activeDate: Date) => {
  const tempActiveArr: Date[] = [];
  if(activeArr.length == 0){
    tempActiveArr.push(activeDate);
  }
  else if(activeArr.length == 1){
    const firstActive: Date = activeArr[0];
    const secondActive: Date = activeDate;
    tempActiveArr.push(firstActive);
    tempActiveArr.push(secondActive);
  }else{
    const firstActive: Date = activeArr[1];
    const secondActive: Date = activeDate;
    tempActiveArr.push(firstActive);
    tempActiveArr.push(secondActive);
  }
  setActiveArr(tempActiveArr);
  createActiveArr(tempActiveArr);
   
  
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
        {activeTerminusArr[0] === activeTerminusArr[1] ? <h1>{activeTerminusArr[0]}</h1> : <h1>{activeTerminusArr[0]} &#45; {activeTerminusArr[1]}</h1>}
        
      </div>
      <div className='calCont'>
        {daysOfWeek.map((day, i) => (<h2 key={i}>{day}</h2>))}
        {bool 
        ? arr.map((item, index) => (
        <div 
        onClick={() => clickActive(item)}
          //set today date color
          className={item.getDate() === test.getDate() && item.getMonth() === test.getMonth() ? 'calItemToday' : 'calItemOther' } 
          key={index}>
            {/* set active day or days orange */}
            <div className={activeFillArr.includes(item.toLocaleDateString('en-US')) ? 'calItemTodayActive' : 'calItem'}>
              {/* set font color black for active month and gray for prev and future month */}
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
