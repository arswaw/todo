/* eslint-disable no-unused-vars */
import { TodoEditor } from "./components/todo-editor.js";
import { TodoList } from "./components/todo-list.js";

const bus = new Vue();

const signupFormTemplate = {
  fullName: "",
  emailAddress: "",
  password: "",
  confirmPassword: ""
};

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  components: {
    "todo-editor": TodoEditor,
    "todo-list": TodoList
  },
  data: function () {
    return {
      showSignup: false
    };
  },
  template: `
    <div>
    <!-- Modal -->
    <div class="modal" style="display: block;overflow: overlay;" v-if="showSignup" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Signup</h5>
        <button type="button" class="close" data-dismiss="modal" @click="showSignup=false" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div>
          <div class="text-center">
            <h1>Create an account</h1>
            <p>Let's get started! When you create an account, you can access your todos from anywhere</p>
          </div>

          <hr>

          <div>
            <div class="form-group">
              <label for="fullName" class="bold">Full name</label>
              <input type="text" id="fullName" class="form-control" placeholder="Sturgis P. Sturgeon">
            </div>

            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" id="email" class="form-control" placeholder="sturgeon@example.com">
            </div>

            <div class="form-group">
              <label for="password">Choose a password</label>
              <input type="password" id="password" class="form-control" placeholder="********">
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirm password</label>
              <input type="password" id="confirmPassword" class="form-control" placeholder="********">
            </div>
          </div>
        </div>
        <p class="text-center">Have an account? <a href="#"><u>Sign in</u></a></p>
      </div>
      <div class="modal-footer">
        <button type="button" @click="showSignup=false" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success">Create account</button>
      </div>
    </div>
  </div>
</div>
<!-- End Modal -->

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="#">TODO</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="showSignup=true" href="#">Signup</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Login</a>
          </li>
        </ul>
        <form class="form-inline mt-2 mt-md-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
        <div class="container">
            <todo-editor></todo-editor>
            <todo-list></todo-list>
        </div>
    </div>
    `
});

export { bus };
