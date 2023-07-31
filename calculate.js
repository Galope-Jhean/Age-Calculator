const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const submit = document.querySelector('.submit');
const yearDisplay = document.querySelector('.numberYear');
const monthDisplay = document.querySelector('.numberMonth');
const dayDisplay = document.querySelector('.numberDays');
const dayError = document.querySelector('.day-error');
const monthError = document.querySelector('.month-error');
const yearError = document.querySelector('.year-error');
const invalidDate = document.querySelector('.invalid');

const daysoftheMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


day.addEventListener('keydown', () => {

    if(day.value === ''){
        dayError.textContent = "Day can't be empty";
        day.style.border = '1px solid red';
    }

    else if(!(day.value > 0 && day.value <= 31) ){
        dayError.textContent = 'Day must be valid';
        day.style.border = '1px solid red';
    }
    else{
        dayError.textContent = '';
        day.style.border = '1px solid hsl(0, 0%, 86%)';
    }

    if(month.value !== ''){
        if(!(day.value <= daysoftheMonths[month.value - 1] && day.value > 0)){
            dayError.textContent = 'Day must be valid';
            day.style.border = '1px solid red';
        }
    }

    invalidDate.textContent = "";
    invalidDate.style.display = none;
    
})

month.addEventListener('keydown', () => {
    if(month.value === ''){
        monthError.textContent = "month can't be empty";
        month.style.border = '1px solid red';
    }
    else if(!(month.value > 0 && month.value <= 12) ){
        monthError.textContent = 'month must be valid';
        month.style.border = '1px solid red';
    }
    
    else{
        monthError.textContent = '';
        month.style.border = '1px solid hsl(0, 0%, 86%)';
    }

    if(!(day.value <= daysoftheMonths[month.value - 1] && day.value > 0)){
        dayError.textContent = 'Day must be valid';
        day.style.border = '1px solid red';
    }
    else{
        dayError.textContent = '';
        day.style.border = '1px solid hsl(0, 0%, 86%)';
    }

    invalidDate.textContent = "";
    invalidDate.style.display = none;
})

year.addEventListener('keydown', () => {
    let yearStr = year.value.toString();
    const date = new Date();
    let currentYear = date.getFullYear(); 

 

    if(yearStr == ''){
        yearError.textContent = 'Year can\'t be empty';
        year.style.border = '1px solid red';
    }
    
    if(yearStr!=''){
        yearError.textContent = '';
        year.style.border = '1px solid hsl(0, 0%, 86%)';
    }

    if(yearStr.length > 4 || year.value > currentYear){
        yearError.textContent = "year is invalid";
        year.style.border = '1px solid red';
    }
    else if(yearStr.length <= 4){
        yearError.textContent = '';
        year.style.border = '1px solid hsl(0, 0%, 86%)';
    }

    invalidDate.textContent = "";
    invalidDate.style.display = none;
})

submit.addEventListener("click", () => {
    if (isValid(day.value, month.value, year.value)) {
        const dayValue = day.value;
        const monthValue = month.value;
        const yearValue = year.value;

        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1;
        const currentDay = date.getDate();

        let dates = getDate(dayValue, monthValue, yearValue, currentYear, currentMonth, currentDay);

        yearDisplay.textContent = dates[2];
        monthDisplay.textContent = dates[1];
        dayDisplay.textContent = dates[0];

        invalidDate.textContent = "";
        invalidDate.style.display = none;
    }
    
    if(day.value == '' || month.value == '' ||  year.value == ''){
        dayError.textContent = "Day can't be empty";
        monthError.textContent = "month can't be empty";
        yearError.textContent = 'Year can\'t be empty';
        year.style.border = '1px solid red';
        day.style.border = '1px solid red';
        month.style.border = '1px solid red';
    } 
    
    if (day.value != '' || month.value != '' ||  year.value != '') {
        dayError.textContent = '';
        day.style.border = '1px solid hsl(0, 0%, 86%)';
        yearError.textContent = '';
        year.style.border = '1px solid hsl(0, 0%, 86%)';
        monthError.textContent = '';
        month.style.border = '1px solid hsl(0, 0%, 86%)';
    }

    if(!isValid(day.value, month.value, year.value)){
        invalidDate.textContent = "Date must be valid";
        invalidDate.style.display = block;
    }

})

const isValid = (day, month, year) => {
    const date = new Date();
    if ((day <= daysoftheMonths[month - 1] && day > 0 ) && month <= 12 && year <= date.getFullYear()) {
        return true;
    }
    else
        return false;
}

const getDate = (dayValue, monthValue, yearValue, currentYear, currentMonth, currentDay) => {

    if (dayValue > currentDay && monthValue > currentMonth) {
        return [(currentDay += daysoftheMonths[currentMonth - 1]) - dayValue, (currentMonth += 12) - monthValue, (currentYear -= 1) - yearValue];
    }
    if (dayValue > currentDay) {
        return [(currentDay += daysoftheMonths[currentMonth - 1]) - dayValue, currentMonth - monthValue, currentYear - yearValue];
    }
    if (monthValue > currentMonth) {
        return [currentDay - dayValue, ((currentMonth += 12) - monthValue), (currentYear -= 1) - yearValue];
    }

    return [currentDay - dayValue, currentMonth - monthValue, currentYear - yearValue];
}