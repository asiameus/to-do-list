{
    const tasks = [];

    const render = () => {
        let listItemssString = "";

        for (const task of tasks) {

            listItemssString += `<li class="taskList__item">`;
            if (task.done === true) {
                listItemssString += `<button class="taskList__button taskList__button--toggleDone js-buttonDone"><img src="img/check.svg"></button>`;
                listItemssString += `<span class="taskList__name taskList__name--done">${task.name}</span>`;
            }
            else {
                listItemssString += `<button class="taskList__button taskList__button--toggleDone js-buttonDone"></button>`;
                listItemssString += `<span class="taskList__name">${task.name}</span>`;
            };
            listItemssString += `<button class="taskList__button taskList__button--remove js-buttonRemove"><img src="img/trash-2.svg"></button></li>`;
        };

        document.querySelector(".js-taskList").innerHTML = listItemssString;

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

    const addNewTask = (newTaskContent) => {
        tasks.push({
            name: newTaskContent,
            done: false,
        });
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const resetInput = (formInputElement) => {
        formInputElement.value = "";
        formInputElement.focus();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const formInputElement = document.querySelector(".js-formInput");
        const newTaskContent = formInputElement.value.trim();

        if (newTaskContent === "") {
            formInputElement.focus();
            return;
        }

        addNewTask(newTaskContent);
        resetInput(formInputElement);
    };

    const init = () => {
        render();
        document.querySelector(".js-form").addEventListener("submit", onFormSubmit);
    };

    init();
}