let nowDate = new Date(),
    nowDateNumber = nowDate.getDate(),
    nowMonth = nowDate.getMonth(),
    nowYear = nowDate.getFullYear(),
    container = document.getElementById('month-calendar'),
    monthContainer = container.getElementsByClassName('month-name')[0],
    yearContainer = container.getElementsByClassName('year-name')[0],
    daysContainer = container.getElementsByClassName('days')[0],
    inputShift=document.querySelector('.inputShift')
    prev = container.getElementsByClassName('prev')[0],
    next = container.getElementsByClassName('next')[0],
    monthName = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
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


    

let testDate=new Date()
let testDate1=new Date(2023,8,2)
console.log('testDate1',testDate1)
console.log('testDate',(testDate))
let DateCount=Math.floor((testDate-testDate1)/(1000*24*3600))
console.log('DateCount',DateCount)

function correctDate() {
    if(nowDate.getMonth()!=8){
        let startDate=new Date(2023,8,1)
        let corDays=(nowDate-startDate)/(1000*3600*24)
        obtainNextDate(corDays)
        console.log('11111',nowDate.getMonth())
    }
}
correctDate()

inputShift.addEventListener('change',(e)=>{
    let shift= e.target.value
    firstWorkShift = shiftsArr[shift]
    console.log('firstWorkShift====>',firstWorkShift)
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
