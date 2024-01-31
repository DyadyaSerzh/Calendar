let getRes=document.querySelector('.getRes')

getRes.addEventListener('click', ()=>{
    let 
    timeNorm=+document.querySelector('.timeNorm').value,
    salary =+document.querySelector('.salary').value,
    dayNorm=+document.querySelector('.dayNorm').value,
    nightNorm=+document.querySelector('.nightNorm').value,
    dayOvernorm=+document.querySelector('.dayOvernorm').value,
    resShow=document.querySelector('.resShow'),
    resDescr=document.querySelector('.resDescr');
    let nightOvernorm=document.querySelector('.nightOvernorm').value;

    console.log('dayNorm====', dayNorm)
    console.log('timeNorm====',timeNorm)
    let salaryOfHour=salary/timeNorm;
    console.log('salaryOfHour',salaryOfHour)
    let workTime=(dayNorm + (nightNorm*12.4)+dayOvernorm*2+nightOvernorm*12.4*2)
    console.log('dayNorm+(nightNorm*12.4)',(dayNorm+(nightNorm*12.4)))
    console.log('workTime',workTime)
    let res=workTime*salaryOfHour
    console.log('res',res)
    resShow.innerHTML=res

})

