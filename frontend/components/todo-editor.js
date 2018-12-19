import { bus } from "../scripts.js";

const TodoEditor = {
  template: "#todo-editor-template",
  methods: {
    addTodo: function () {
      if (!this.todoText) {
        alert("We need something here.");
        // here we can put an alert from sweet alert library, you know it?
        // No, but I can look when I'm done
        // Ok, here is the link https://sweetalert2.github.io/
      } else {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];

        function getMonthName (ind) {
          return months[ind];
        }

        const date = new Date();

        this.todos = JSON.parse(localStorage.getItem("todos"));

        // The newest todos go to the front of the list
        this.todos.push({
          name: this.todoText,
          created: `${getMonthName(date.getMonth())} ${date.getDate()}`,
          id: Math.floor(Math.random() * 100),
          state: "pending"
        });

        // You might also check that the id is not taken.
        // Or put in a more random number.
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.todoText = "";

        bus.$emit("add-button-click", "clicked");
      }
    }
  },

  mounted: function () {
    const local = JSON.parse(localStorage.getItem("todos"));

    // Null because an empty localstorage is null.
    if (local !== null) {
      this.todos = local;
    }
  },

  data: function () {
    return {
      todoText: "",
      todos: []
    };
  }
};

export { TodoEditor };
