import * as React from "react"
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

    const toggleOpen = React.useCallback((open) => {
        setOpen(open);
    }, []);

    const toggleShowDayPlan = React.useCallback((day) => {

        setShowDayPlan(day);
    }, []);



    return {
        darkTheme,
        showDayPlan,
        open,
        toggleShowDayPlan,
        toggleTheme,
        toggleOpen
    };
}