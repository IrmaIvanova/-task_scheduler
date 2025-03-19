import * as React from "react"
import { weekdaysArray } from '../../constants'
const Context = React.createContext(null);


export const AppContextProvider = ({ children, ...props }) => {
    const context = useCreateAppContext(props);
    return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useAppContext = () => {
    const context = React.useContext(Context);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}


export const useCreateAppContext = function (props) {
    const [darkTheme, setDarkTheme] = React.useState(false)
    const [showDayPlan, setShowDayPlan] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)

    let getPlanFromLocalStorage = localStorage.getItem("myPlan")
    // localStorage.clear();
    const [plan, setPlan] = React.useState( JSON.parse(getPlanFromLocalStorage) || [])

// 
    // localStorage.setItem("myPlan",JSON.stringify( weekdaysArray))


    const toggleTheme = React.useCallback(() => {
        setDarkTheme(!darkTheme);
    }, [darkTheme]);

    const toggleOpen = React.useCallback((open) => {
        setOpen(open);
    }, []);

    const toggleShowDayPlan = React.useCallback((day) => {
        setShowDayPlan(day);

    }, []);



    const addToDoItem = (dayPLan) => {

        const dayPlanExist = plan.find((el) => el.day === dayPLan.day && el.month === dayPLan.month && el.year === dayPLan.year)
        if (!dayPlanExist) {

            setPlan([...plan, dayPLan])
            
            localStorage.setItem("myPlan", JSON.stringify([...plan, dayPLan]))
            return
        } else {
            let changedPlan = plan.reduce((acc, dayItem) => {
                if (dayItem.day === dayPLan.day && dayItem.month === dayPLan.month && dayItem.year === dayPLan.year) {
                    return [...acc, dayPLan];
                }

                return [...acc, dayItem];
            }, []);

            setPlan(changedPlan)
            localStorage.setItem("myPlan", JSON.stringify(changedPlan))
        }

    };

    return {
        darkTheme,
        showDayPlan,
        open,
        plan,
        toggleShowDayPlan,
        toggleTheme,
        toggleOpen,
        addToDoItem
    };
}