{
    let tasks = [];

    const renderTaskList = () => {
        let listItemssString = "";

        for (const task of tasks) {

            listItemssString += `<li class="taskList__item">`;
            if (task.done === true) {
                listItemssString +=
                    `<button class="taskList__button taskList__button--toggleDone js-buttonDone"><img src="img/check.svg"></button>
                    <span class="taskList__name taskList__name--done">${task.name}</span>`;
            }
            else {
                listItemssString +=
                    `<button class="taskList__button taskList__button--toggleDone js-buttonDone"></button>
                    <span class="taskList__name">${task.name}</span>`;
            };
            listItemssString += `<button class="taskList__button taskList__button--remove js-buttonRemove"><img src="img/trash-2.svg"></button></li>`;
        };

        document.querySelector(".js-taskList").innerHTML = listItemssString;
    }

    const render = () => {
        renderTaskList();
        bindEvents();
    };

    const bindEvents = () => {
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

    const addNewTask = (newTaskName) => {
        tasks = [
            ...tasks,
            { name: newTaskName, done: false },
        ];

        render();
    }

    const toggleTaskDone = (taskIndex) => {
        if (tasks[taskIndex].done) {
            tasks = [
                ...tasks.slice(0, taskIndex),
                { ...tasks[taskIndex], done: false },
                ...tasks.slice(taskIndex + 1),
            ];
        }
        else {
            tasks = [
                ...tasks.slice(0, taskIndex),
                { ...tasks[taskIndex], done: true },
                ...tasks.slice(taskIndex + 1),
            ];
        }

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        
        render();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const formInputElement = document.querySelector(".js-formInput");
        const newTaskName = formInputElement.value.trim();

        if (newTaskName !== "") {
            addNewTask(newTaskName);
            formInputElement.value = "";
        }

        formInputElement.focus();
    };

    const init = () => {
        render();
        document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
    };

    init();
}