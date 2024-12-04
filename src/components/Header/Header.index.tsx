import { createCn as cn } from "bem-react-classname";

export const cnCalendarHeader = cn("CalendarHeader")
export interface HeaderProps {
    month: string,
    year: number
}