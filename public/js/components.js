Vue.component('list-tasks', {
    template: "#listTasks",
    data() {
        return {
            tasks: null
        }
    },
    async created() {
        try {
            let resp = await fetch('/task/get');
            let arrTasks = await resp.json()
            console.log(arrTasks);
            this.tasks = arrTasks.tasks;
        } catch (error) {
            console.log(error);
        }
    },
})