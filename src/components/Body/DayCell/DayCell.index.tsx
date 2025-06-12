export interface DayCellProps {
    day: number;
    theme: string;
    isToday: boolean;
    isWeekend: boolean;
    isOutOfMonth: boolean;
    open: boolean;
    events: any[];
    width: number;
    onClick: () => void;
}