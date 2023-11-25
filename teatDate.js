let nowDate = new Date(),
    nowDateNumber = nowDate.getDate(),
    nowMonth = nowDate.getMonth(),
    nowYear = nowDate.getFullYear(),
    container = document.getElementById('month-calendar'),
    hours=document.querySelector('.hours'),
    monthContainer = container.getElementsByClassName('month-name')[0],
    yearContainer = container.getElementsByClassName('year-name')[0],
    daysContainer = container.getElementsByClassName('days')[0],
    inputShift=document.querySelector('.inputShift')
    inputDates=document.querySelectorAll('.inputDate')
    prev = container.getElementsByClassName('prev')[0],
    next = container.getElementsByClassName('next')[0],
    monthName = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
    startWorkPrev={},
    startWorkNext={},
    shiftsArr={
        A:{
            day:1,
            shift:4
        },    
        B:{
            day:1,
            shift:2
        },    
        C:{
            day:1,
            shift:3
        },
        D:{
            day:1,
            shift:1
        },
    },
    firstWorkShift={
        day:1,
        shift:4
    };

if (localStorage.LocalShift){
    inputDates.forEach(e=>{
        if (e.value==localStorage.LocalShift){
            e.checked=true
            firstWorkShift = shiftsArr[localStorage.LocalShift]
            
        }
    })

}



function correctDate() {
    if(nowDate.getMonth()!=8||nowDate.getFullYear()!=2023){
        let testDate=new Date()
        let now_Month=testDate.getMonth()
        let now_Year=testDate.getFullYear()
        let correct_Date=new Date(now_Year,now_Month,1)
        let testDate1=new Date(2023,8,1)
        
        let DateCount=Math.floor((correct_Date-testDate1)/(1000*24*3600))
        console.log('DateCount',DateCount)
        obtainNextDate(DateCount)
    }
}
correctDate()

inputShift.addEventListener('change',(e)=>{
    let shift= e.target.value
    localStorage.LocalShift=shift;
    firstWorkShift = shiftsArr[shift]
    console.log('firstWorkShift====>',firstWorkShift)
    console.log('shift====>',shift)
    console.log('shiftLocal====>',localStorage.LocalShift)
    correctDate()
    setMonthCalendar(nowYear,nowMonth);
})

// let curDate = nowDate.setMonth(nowDate.getMonth() - 1);

function obtainPrevDate(monthDays){
    let koof = monthDays-Math.floor(monthDays/12)*12
    console.log('monthDays',monthDays)
    console.log('koof===',koof)
    for(i=koof;i>0;i--){
        if(firstWorkShift.day-1>0){firstWorkShift.day=firstWorkShift.day-1}
        else if (firstWorkShift.shift-1>0){
            firstWorkShift.shift=firstWorkShift.shift-1
            firstWorkShift.day=3
        } else {
            firstWorkShift.shift=4
            firstWorkShift.day=3
        }
    }
  
}

function obtainNextDate(monthDays){
    let koof = monthDays-Math.floor(monthDays/12)*12
    console.log('monthDays',monthDays)
    console.log('koof===',koof)
    for(i=0;i<koof;i++){
        if(firstWorkShift.day+1<=3){firstWorkShift.day=firstWorkShift.day+1}
        else if (firstWorkShift.shift+1<=4){
            firstWorkShift.shift=firstWorkShift.shift+1
            firstWorkShift.day=1
        } else {
            firstWorkShift.shift=1
            firstWorkShift.day=1
        }

    }
  
}
// inpuDate.addEventListener("change", setStartDate);
function setStartDate(e){
    let dataMonth=new Date(e.target.value).getMonth()
    let dataDay=new Date(e.target.value).getDate()
    let dataYear=new Date(e.target.value).getFullYear()
    console.log('date',dataDay)
    console.log('date',dataMonth)
    console.log('date',dataYear)
    curYear=dataYear
    curMonth=dataMonth
    dayStartWork.pop()
    dayStartWork.push(dataDay)
    setMonthCalendar(curYear,curMonth,dayStartWork);

}
function setMonthCalendar(year,month) {
    console.log('firstWorkShift2====>',firstWorkShift)
    
    let workDays=[],
    workNights=[];
    function createWorkShifts({day,shift},monthDays){
        for(d=1;d<=monthDays;d++){
            if(shift==1){
                if(day<3){
                    workDays.push(d)
                    day++
                    }else{
                    workDays.push(d)
                    day=1
                    shift++;
                }
            }else if(shift==2){
                if(day<3){
                    day++
                }else{
                    day=1
                    shift++
                }
            }else if(shift==3){
                if(day<3){
                    workNights.push(d)
                    day++
                }else{
                    workNights.push(d)
                    day=1;
                    shift++
                }
            }else if(shift==4){
                if(day<3){
                    day++
                }else{
                    day=1
                    shift=1
                }
            }
        }
        console.log(workDays)
        console.log(workNights)
        let DaysHours=workDays.length*12
        let NightsHoursFact=workNights.length*12
        let NightsHoursReal=(workNights.length*4)+(workNights.length*8)*1.2
        hours.innerHTML=`<H3>Денні години --- ${DaysHours}</H3><H3>Нічні години --- ${NightsHoursFact}<H3>Нічні години фактичні --- ${NightsHoursReal}</H3><H1>Сумарні години --- ${DaysHours+NightsHoursReal}</H1>`
        console.log('DaysHours',DaysHours)
        console.log('NightsHoursFact',NightsHoursFact)
        console.log('NightsHoursReal',NightsHoursReal)
        console.log('HoursFactSumm',(DaysHours+NightsHoursReal))
    };
    
    let monthDays = new Date(year, month + 1, 0).getDate(),
        monthDaysPrev = new Date(year, month, 0).getDate(),
        monthPrefix = new Date(year, month, 0).getDay(),
        monthDaysText = '';
    
    
    monthContainer.textContent = monthName[month];
    yearContainer.textContent = year;
    daysContainer.innerHTML = '';
    
    
    if (monthPrefix > 0){
        for (let i = 1  ; i <= monthPrefix; i++){
            monthDaysText += '<li></li>';
        }
    }

    for (let i = 1; i <= monthDays; i++){
        monthDaysText += '<li >' + i + '</li>';
    }

    daysContainer.innerHTML = monthDaysText;
    days = daysContainer.getElementsByTagName('li');
    
    createWorkShifts(firstWorkShift,monthDays)

    if (month == nowMonth && year == nowYear){
        days = daysContainer.getElementsByTagName('li');
        days[monthPrefix + nowDateNumber - 1].classList.add('date-now');
    }
    workDays.forEach(i=>{
        days = daysContainer.getElementsByTagName('li');
        days[monthPrefix+i-1].classList.add('workDays');
    })
    workNights.forEach(i=>{
        days = daysContainer.getElementsByTagName('li');
        days[monthPrefix+i-1].classList.add('workNights');
    })

}

setMonthCalendar(nowYear,nowMonth);

prev.onclick = function () {
    let curDate = new Date(yearContainer.textContent,monthName.indexOf(monthContainer.textContent));

    curDate.setMonth(curDate.getMonth() - 1);

    let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth(),
        monthDays=new Date(curYear,curMonth+1,0).getDate();
        obtainPrevDate(monthDays)
    setMonthCalendar(curYear,curMonth);
}


next.onclick = function () {
    
    let curDate = new Date(yearContainer.textContent,monthName.indexOf(monthContainer.textContent));

    curDate.setMonth(curDate.getMonth() + 1);

    let curYear = curDate.getFullYear(),
        curMonth = curDate.getMonth();
        monthDays=new Date(curYear,curMonth,0).getDate();
        obtainNextDate(monthDays)
    setMonthCalendar(curYear,curMonth);
}
