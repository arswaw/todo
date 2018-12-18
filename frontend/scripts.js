import { TodoEditor } from './components/todo-editor.js'
import { TodoList } from './components/todo-list.js'

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
    `
})

export { bus }