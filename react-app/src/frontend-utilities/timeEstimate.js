// Takes in an array of task objects and
// adds up all time estimates for uncompleted
// tasks. Converts the sum in minutes to a
// string of days, hours, and minutes.
export const timeEstimate = (taskArr) => {
    let min = 0;
    let s = "";
    taskArr.forEach((task) => {
        if (!task.completed && task.estimate) {
            min += task.estimate
        }
    });

    const d = Math.floor(min / (60*24));
    const h = Math.floor((min % (60 * 24)) / 60);
    const m = (min % 60);
    if (d) s += `${d}d `;
    if (h) s += `${h}hr `;
    if (m) s += `${m}min `;

    return s;
};
