const TodoEditor = {
    template: `
        <div class="container">
            <h1>Add a Todo</h1>
            <div class="row my-5">
                <div class="col">
                    <input v-model="todoText" class="form-control form-control-lg" type="text" placeholder="What do you want to do?">
                </div>
                    
                <div class="col">
                    <button class="btn btn-primary" @click='addTodo()'>Add</button>
                </div>
            </div>
        </div>
    `,
    methods: {
        addTodo: function() {
            if (!this.todoText) {
                alert("We need something here.");
                // here we can put an alert from sweet alert library, you know it?
                // No, but I can look when I'm done
                // Ok, here is the link https://sweetalert2.github.io/
            } else {
                console.log(this.todoText);
                this.todos.push(this.todoText)
                localStorage.setItem('todos', JSON.stringify(this.todos));
                this.todoText = '';
            }
        }
    },
    data: function() {
        return {
            todoText: "",
            todos: []
        }
    }
}

const TodoList = {
    template: `
        
        <div class="container">
            <div class="row my-5">
                <div class="col">
                    <h1 class="mt-5">Your To-Do's</h1>
                    <button class="btn btn-primary mt-3" @click="obtain()">Obtain the todo's</button>
                </div>
                
                <div class="col">
                    <ul class="mt-5 list-group">
                        <li v-for="todo in display" class="list-group-item">{{ todo }}</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    methods: {
        obtain: function() {
            if (localStorage.length > 0) {
                this.display = JSON.parse(localStorage.getItem("todos"))
            }
        }
    },
    data: function() {
        return {
            display: []
        }
    }
}

new Vue({
    el: '#app',
    components: {
        'todo-editor': TodoEditor,
        'todo-list': TodoList
    },
    template: `
        <div>
            <todo-editor></todo-editor>
            <todo-list></todo-list>
        </div>
    `
})