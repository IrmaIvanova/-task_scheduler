export const monthArray = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

export const weekdaysArray = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
export const weekdaysArrayAmerican = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]

// export const monthSheduleArr=new Array(42).fill({title:"предновогодний месяц", todo:[{title:"подъем", time:"8.00"},{title:"завтрак",time:"8.30"},{title:"сон",time:"22.00" }] })

export const createArrayYears = (currentYear: number) => {
    const start = currentYear - 20;
    const end = currentYear + 5;
    const arr = [];

    for (let i = start; i <= end; ++i) {
        arr.push(i);
    }

    return arr;
}

