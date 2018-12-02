import TodoEditor from './components/todo-editor.js'

new Vue({
    el: '#app',
    components: {
        'todo-editor': TodoEditor
    },
    data: function() {
        return {
            
        }
    },
    template: `
        <todo-editor>
    `
})