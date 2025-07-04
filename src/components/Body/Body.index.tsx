import cn from 'classnames';

export const cnCalendarBody = cn("CalendarBody")

export interface BodyProps {
    weekdays: string[],
    selectYear: number,
    selectMonth: number,
    actualYear: number,
    actualMonth: number,
    today: number,
    theme:string,
width:number,
}