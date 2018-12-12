const bus = new Vue();

const TodoList = {
    template: '#todo-list-template',
    methods: {
        action(actionValue, index, todo) {
            switch (actionValue) {
                case 'done':
                    this.actionValue = ""
                    this.changeState(index);
                    break;
                    
                case 'edit':
                    this.actionValue = ""
                    this.showTodoEditor(todo, index);
                    break;
                    
                case 'delete':
                    this.actionValue = ""
                    this.deleteTodo(index, todo);
                    break;
                
                default:
                    console.error('actionValue undefined');
            }
            
        },
        
        deleteTodo(ind, item) {
            
            this.showEditor = false;

            // TODO refactor to just use this.display
            const todos = JSON.parse(localStorage.getItem("todos"));
            
            todos.splice(ind, 1);

            this.display = todos;

            localStorage.setItem("todos", JSON.stringify(todos));

            console.info("Index to delete", ind, item, this.display);

        },

        showTodoEditor(item, ind) {
            console.info("edit", item);

            this.currentTodo = item;
            this.showEditor = true;

        },
        
        updateTodo() {
            console.info("Update", this.currentTodo, this.newName);
            this.currentTodo.name = this.newName;
            this.display[this.editIndex] = this.currentTodo;
            localStorage.setItem("todos", JSON.stringify(this.display));
            this.newName = '';
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
            localStorage.setItem('todos', JSON.stringify(this.display));
        }
    },

    data: function() {
        return {
            display: [],
            showEditor: false,
            currentTodo: {},
            newName: "",
            editIndex: -1,
            isDone: false,
            actionValue: '',
            actionState: []
        }
    },

    mounted: function() {
        this.refreshList()
        
        this.display.map(dis => {
            this.actionState.push("")
        })
        
        console.info("ActionState mounted", this.actionState)
        
        const vm = this
        
        bus.$on('add-button-click', function (msg) {
            vm.refreshList();
        })
    }
}

export { TodoList }