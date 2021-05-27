export function getTomorrowDate(toYear, toMonth, toDay) {
    const today = new Date(toYear, toMonth - 1, toDay, 0, 0, 0, 0);
    const tomorrow = new Date(today.valueOf() + 1000 * 60 * 60 * 24);

    const tomorrowYear = tomorrow.getFullYear();
    const tomorrowMonth = tomorrow.getMonth() + 1;
    const tomorrowDay = tomorrow.getDate();

    return [tomorrowYear, tomorrowMonth, tomorrowDay];
}

/*
// tests
console.log(getTomorrowDate(2020,03,08));
console.log(getTomorrowDate(2020,04,01));
console.log(getTomorrowDate(2020,09,01));
console.log(getTomorrowDate(2020,1,01));
*/
