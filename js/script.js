{
    const tasks = [
        {
            name: "zrobić aplikację",
            done: false,
        },
        {
            name: "zrobić zakupy",
            done: true,
        }
    ];

    const render = () => {
        let listItemssString = "";

        for (let i = 0; i < tasks.length; i++) {

            listItemssString += `<li class="taskList__item">`;
            listItemssString += `<button class="taskList__button--done js-buttonDone">✅</button>`;
            if (tasks[i].done === true) {
                listItemssString += `<span class="taskList__name taskList__name--done">${tasks[i].name}</span>`;
            }
            else {
                listItemssString += `<span class="taskList__name">${tasks[i].name}</span>`;
            };
            listItemssString += `<button class="taskList__button--remove js-buttonRemove">🗑️</button></li>`;
        };

        document.querySelector(".js-taskList").innerHTML = listItemssString;

        const doneButtons = document.querySelectorAll(".js-buttonDone");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const addTask = (event) => {
        event.preventDefault();
        tasks.push({
            name: document.querySelector(".js-formInput").value.trim(),
            done: false,
        });
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        if (tasks[taskIndex].done) {
            tasks[taskIndex].done = false;
        }
        else {
            tasks[taskIndex].done = true;
        };
        render();
    };


    const init = () => {
        document.querySelector(".js-form").addEventListener("submit", addTask);
        render();
    };


    init();

}