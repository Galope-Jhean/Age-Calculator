const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const submit = document.querySelector('.submit');
const yearDisplay = document.querySelector('.numberYear');
const monthDisplay = document.querySelector('.numberMonth');
const dayDisplay = document.querySelector('.numberDays');

const daysoftheMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

submit.addEventListener("click", () => {
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
})

let getDate = (dayValue, monthValue, yearValue, currentYear, currentMonth, currentDay) => {

    if(dayValue > currentDay && monthValue > currentMonth){
        return [(currentDay += daysoftheMonths[currentMonth-1]) - dayValue, (currentMonth += 12) - monthValue, (currentYear -= 1) - yearValue];
    }
    if (dayValue > currentDay){
        return [(currentDay += daysoftheMonths[currentMonth-1]) - dayValue, (currentMonth -= 1) - monthValue, currentYear - yearValue];
    }
    if(monthValue - currentMonth){
        console.log('happe');
        return [currentDay - dayValue, ((currentMonth += 12) - monthValue), (currentYear -= 1) - yearValue];
    }
    
    return [currentDay - dayValue, currentMonth - monthValue, currentYear - yearValue];

}