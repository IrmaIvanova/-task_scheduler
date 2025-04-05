    export const createDay = (dayItem: any) => {
        fetch(`http://localhost:5000/api/task/planner`, {
            method: 'POST',
            body: JSON.stringify(dayItem),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result) => { })
    }



