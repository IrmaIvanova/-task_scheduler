export const saveTaskToServer = (taskItem: any) => {
    fetch(`http://localhost:5000/api/task`, {
        method: 'POST',
        body: JSON.stringify(taskItem),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((result) => {

            console.log("res", result)
        });
};