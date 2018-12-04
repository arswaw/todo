const TodoEditor = {
    template: `
        <div class="my-3 p-3 bg-white rounded shadow-sm">
            <h1>Add a Todo</h1>
            <div class="row">
                <div class="col-9">
                    <input v-model="todoText" class="form-control form-control-lg" type="text" placeholder="What do you want to do?">
                </div>
                    
                <div class="col-3">
                    <button class="btn btn-primary btn-lg btn-block" @click='addTodo()'>Add</button>
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
            }
            else {
                
                const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                
                function getMonthName(ind) {
                    
                    
                    return months[ind]
                }
                
                const date = new Date();
                // The newest todos go to the front of the list
                this.todos.push({
                    name: this.todoText,
                    created: `${getMonthName(date.getMonth())} ${date.getDate()}`,
                    id: Math.floor(Math.random() * 100),
                    state: 'pending'
                });

                // You might also check that the id is not taken.
                // Or put in a more random number.
                localStorage.setItem('todos', JSON.stringify(this.todos));
                this.todoText = '';
                
                bus.$emit('add-button-click', 'clicked');
            }
        }
    },

    mounted: function() {
        const local = JSON.parse(localStorage.getItem("todos"))
        
        if (local !== null) {
            this.todos = local
        }
    },

    data: function() {
        return {
            todoText: "",
            todos: [],
            
        }
    }
}

const TodoList = {
    template: `
        
        <div class="my-3 p-3 bg-white rounded shadow-sm">
            <div class="row">
                <div class="col-12">
                    <h1>Your To-Do's</h1>
                </div>
                
               
                
                <div class="col">
                    <div class="row" v-if="showEditor">
                        <div class="col-6">
                            <input v-model="newName" class="form-control form-control-lg" type="text" placeholder="Enter new todo name">
                        </div>
                        
                    <div class="col-6">
                    <div class="btn-group" role="group">
                        <button class="btn btn-primary btn-lg mr-3 rounded" @click='updateTodo()'>Update</button>
                        <button class="btn btn-secondary btn-lg rounded" @click='showEditor=false'>Cancel</button>
                    </div>
                    </div>
                </div>
                    <ul class="mt-5 list-group">
                        <li v-for="(todo, index) in display" class="list-group-item d-flex justify-content-between align-items-center" v-bind:class="{'list-group-item-success': todo.state === 'finished' ? true : false, 'list-group-item-danger': todo.state === 'pending' ? true : false}">{{ todo.name }}
                            <div class="btn-group" role="group" aria-label="Edit delete group">
                                <span class="mr-3">{{todo.created}} </span>
                                
                                <button class="btn btn-success mr-2 rounded" @click="changeState(index)">Done</button>
                                
                                <button type="button" @click="showTodoEditor(todo, index)" class="btn btn-primary mr-2 rounded">Edit</button>
                                <button type="button" @click="deleteTodo(index, todo)" class="btn btn-danger rounded">Delete</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    methods: {
        deleteTodo(ind, item) {
            
            this.showEditor = false

            // TODO refactor to just use this.display
            const todos = JSON.parse(localStorage.getItem("todos"))

            const modified = todos.filter(todo => {
                return todo.id !== item.id
            })


            this.display = modified

            localStorage.setItem("todos", JSON.stringify(modified))

            console.info("Index to delete", ind, item, modified, this.display)

        },

        showTodoEditor(item, ind) {
            console.info("edit", item)

            this.currentTodo = item
            this.showEditor = true

        },
        
        updateTodo() {
            console.info("Update", this.currentTodo, this.newName)
            this.currentTodo.name = this.newName
            this.display[this.editIndex] = this.currentTodo
            localStorage.setItem("todos", JSON.stringify(this.display))
        },
        
        refreshList() {
            // This will load all ToDO's when the component is mounted
            try {
                this.display = JSON.parse(localStorage.getItem("todos"));
            }
            catch (err) {
                return console.error(err, err.message);
            }
        },
        
        changeState(index) {
            this.display[index].state = this.display[index].state === 'pending' ? 'finished' : 'pending';
        }
    },

    data: function() {
        return {
            display: [],
            showEditor: false,
            currentTodo: {},
            newName: "",
            editIndex: -1,
            isDone: false
        }
    },

    mounted: function() {
        this.refreshList()
        
        const vm = this
        
        bus.$on('add-button-click', function (msg) {
        vm.refreshList();
        })
    }
}

const bus = new Vue();

new Vue({
    el: '#app',
    components: {
        'todo-editor': TodoEditor,
        'todo-list': TodoList
    },
    template: `
        <div class="container">
            <todo-editor></todo-editor>
            <todo-list></todo-list>
        </div>
    `,

})
