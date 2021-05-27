export function getYesterdayDate(toYear, toMonth, toDay) {
    const today = new Date(toYear, toMonth - 1, toDay, 0, 0, 0, 0);
    const tomorrow = new Date(today.valueOf() - 1000 * 60 * 60 * 24);

    const yesterYear = tomorrow.getFullYear();
    const yesterMonth = tomorrow.getMonth() + 1;
    const yesterDay = tomorrow.getDate();

    return [yesterYear, yesterMonth, yesterDay];
}

/*
// tests
console.log(getYesterdayDate(2020,03,08));
console.log(getYesterdayDate(2020,04,01));
console.log(getYesterdayDate(2020,09,01));
console.log(getYesterdayDate(2020,1,01));
*/
