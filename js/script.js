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
            if (tasks[i].done === true) {
                listItemssString += `<button class="taskList__button js-buttonDone"><img src="img/check.svg"></button>`;
                listItemssString += `<span class="taskList__name taskList__name--done">${tasks[i].name}</span>`;
            }
            else {
                listItemssString += `<button class="taskList__button js-buttonDone"></button>`;
                listItemssString += `<span class="taskList__name">${tasks[i].name}</span>`;
            };
            listItemssString += `<button class="taskList__button taskList__button--remove js-buttonRemove"><img src="img/trash-2.svg"></button></li>`;
        };

        document.querySelector(".js-taskList").innerHTML = listItemssString;

        const doneButtons = document.querySelectorAll(".js-buttonDone");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-buttonRemove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
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

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }


    const init = () => {
        document.querySelector(".js-form").addEventListener("submit", addTask);
        render();
    };


    init();

}