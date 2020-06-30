{
    const tasks = [
        {
            name: "zrobić aplikację",
            done: false,
        },
        {
            name: "zrobić zakupy",
            done: false,
        }
    ];

    const render = () => {
        let listElementsString = "";

        for (let i = 0; i < tasks.length; i++) {
            listElementsString += `<li class="taskList__item">
            <button class="taskList__button--done">✅</button>
            ${tasks[i].name}
            <button class="taskList__button--remove">🗑️</button>
            </li>`
        };

        const taskListElement = document.querySelector(".js-taskList");
        taskListElement.innerHTML = listElementsString;
    };

    const addTask = (event) => {
        event.preventDefault();
        tasks.push({
            name: document.querySelector(".js-formInput").value.trim(),
            done: false,
        });

        render();
    };

    const init = () => {
        document.querySelector(".js-form").addEventListener("submit", addTask);
        render();
    };

    init();

}