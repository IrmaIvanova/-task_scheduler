import * as React from "react"

// export interface Planner {
//     id: string,
//     date: string,
//     tasks: Task[]
// }

// export interface Task {
//     title: string,
//     time?: string,
//     id: string,
//     checked: boolean,
//     plannerId: string
// }
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

    const toggleTheme = React.useCallback(() => {
        setDarkTheme(!darkTheme);
    }, [darkTheme]);

    const theme = darkTheme ? "NightTheme" : "DayTheme";
    
    const toggleOpen = React.useCallback((open) => {
        setOpen(open);
    }, []);

    const toggleShowDayPlan = React.useCallback((day) => {
        setShowDayPlan(day);

    }, []);


    return {
        theme,
        darkTheme,
        showDayPlan,
        open,
        toggleShowDayPlan,
        toggleTheme,
        toggleOpen,
    };
}