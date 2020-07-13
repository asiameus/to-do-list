{
    let tasks = [];
    let doneTasksHidden = false;

    const renderTaskList = () => {
        let listItemsString = "";

        let undoneTasks = tasks.filter(({ done }) => !done);

        let tasksForRender;

        if (doneTasksHidden) {
            tasksForRender = undoneTasks;
        }
        else {
            tasksForRender = tasks;
        };

        for (const task of tasksForRender) {

            listItemsString += `<li class="taskList__item">`;
            if (task.done === true) {
                listItemsString +=
                    `<button class="taskList__button taskList__button--toggleDone js-buttonToggleDone"><img src="img/check.svg"></button>
                    <span class="taskList__name taskList__name--done">${task.name}</span>`;
            }
            else {
                listItemsString +=
                    `<button class="taskList__button taskList__button--toggleDone js-buttonToggleDone"></button>
                    <span class="taskList__name">${task.name}</span>`;
            };
            listItemsString += `<button class="taskList__button taskList__button--remove js-buttonRemove"><img src="img/trash-2.svg"></button></li>`;
        };

        document.querySelector(".js-taskList").innerHTML = listItemsString;
    }

    const renderButtons = () => {
        let buttonsString = "";
        if (tasks.length) {
            buttonsString =
                `<button class="section__button section__button--hideDone js-buttonHideDone">${doneTasksHidden ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
                <button class="section__button section__button--toggleAllDone js-buttonToggleAllDone"${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>`;
        }
        else {
            buttonsString = "";
        }
        document.querySelector(".js-buttonContainer").innerHTML = buttonsString;
    }

    const bindEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-buttonToggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
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

    const bindButtonEvents = () => {
        if (tasks.length) {
            const hideDoneButtons = document.querySelector(".js-buttonHideDone");
            hideDoneButtons.addEventListener("click", () => {
                doneTasksHidden = !doneTasksHidden;
                render();
            });

            const toggleAllDoneButtons = document.querySelector(".js-buttonToggleAllDone");
            toggleAllDoneButtons.addEventListener("click", () => {
                tasks.forEach((task, index) => {
                    tasks = [
                        ...tasks.slice(0, index),
                        { ...task, done: true },
                        ...tasks.slice(index + 1),
                    ];
                });
                render();
            });
        };
    };

    const addNewTask = (newTaskName) => {
        tasks = [
            ...tasks,
            { name: newTaskName, done: false },
        ];

        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const render = () => {
        renderTaskList();
        renderButtons();
        bindEvents();
        bindButtonEvents();
    };

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