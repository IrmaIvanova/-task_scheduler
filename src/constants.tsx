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




export const monthSheduleArr = [
    {
        "day": 25,
        "month": 10,
        "year": 2024,
        "todo": [
            {
                "title": "подъем",
                "time": "8.00"
            },
            {
                "title": "завтрак",
                "time": "8.30"
            },
            {
                "title": "сон",
                "time": "22.00"
            }
        ]
    },
    {
        "day": 1,
        "month": 11,
        "year": 2024,
        "todo": [
            {
                "title": "подъем",
                "time": "8.00"
            },
            {
                "title": "завтрак",
                "time": "8.30"
            },
            {
                "title": "сон",
                "time": "22.00"
            }
        ]
    },
    {
        "day": 9,
        "month": 11,
        "year": 2024,
        "todo": [
            {
                "title": "подъем",
                "time": "8.00"
            },
            {
                "title": "завтрак",
                "time": "8.30"
            },
            {
                "title": "сон",
                "time": "22.00"
            }
        ]
    },
    {
        "day": 23,
        "month": 11,
        "year": 2024,
        "todo": [
            {
                "title": "подъем",
                "time": "8.00"
            },
            {
                "title": "завтрак",
                "time": "8.30"
            },
            {
                "title": "сон",
                "time": "22.00"
            }
        ]
    },
    {
        "day": 24,
        "month": 11,
        "year": 2024,
        "todo": [
            {
                "title": "завтрак",
                "time": "9.00"
            },
            {
                "title": "работа",
                "time": "10.30"
            },
            {
                "title": "сон",
                "time": "22.00"
            }
        ]
    },
]
