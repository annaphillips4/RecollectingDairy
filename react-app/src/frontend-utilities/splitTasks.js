// Takes in an array of tasks and returns multiple
// arrays in an object
export const splitTasks = (taskArr) => {
    const completed = []
    const incomplete = []
    const overdue = []
    const dueToday = []
    const dueTomorrow = []
    const currentDate = new Date();
    const tomorrow = new Date(currentDate.toString());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todayStr = currentDate.toString().slice(0, 15);
    const tomorrowStr = tomorrow.toString().slice(0, 15);

    taskArr.forEach((task) => {
        if (task.completed) {
            completed.push(task);
        } else {
            incomplete.push(task);
            if (task.dueDate) {
                const taskDue = new Date(task.dueDate);
                const dueStr = taskDue.toString().slice(0, 15);
                if (taskDue < currentDate) {
                    overdue.push(task);
                } else if (dueStr === todayStr) {
                    dueToday.push(task)
                } else if (dueStr === tomorrowStr) {
                    dueTomorrow.push(task)
                }
            }
        }
    });
    return { completed, incomplete, overdue, dueToday, dueTomorrow }
};
