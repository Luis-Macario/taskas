import {div, h1} from "../../DSL/tags.js";
import {API_BASE_URL} from "../../configs/configs.js";
import UserCreateForm from "./UserCreateForm.js";

function createUser(mainContent) {
    function handleSubmit(event) {
        event.preventDefault()

        const username = document.querySelector("#idName").value
        const email = document.querySelector("#idEmail").value
        const password = document.querySelector("#idPassword").value

        /*if (!username.match(/^[a-zA-Z0-9._-]{3,60}$/)) {
            alert("Invalid username")
            return;
        }*/

        if (username.length < 3 || username.length > 50) {
            alert("Username must be between 3 and 50 letters long")
            return;
        }

        if (!email.match(/^[A-Za-z\d+_.-]+@(.+)$/)) {
            alert("Invalid email")
            return;
        }

        if (password.length < 6 || password.length > 30) {
            alert("Password must be between 6 and 30 letters long")
            return;
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            })
        }
        fetch(API_BASE_URL + "users/", options)
            .then(res => res.json())
            .then(user => {
                console.log(user)
                window.location.hash = "users/" + user.id
            })
    }

    /*const myForm = form({},
        br(),
        div({class: "input-group mb-3"},
            div({class: "input-group-prepend", style: "float:left; width:100px"},
                span({class: "input-group-text", id: "inputGroup-sizing-default"}, "Name")),
            br(),
            inputV2({
                type: "text", id: "idName", name: "idName",
                class: "form-control",
                placeholder: "Enter your name", minlength: "3", maxlength: "50",
                required: true
            })
        ),
        div({class: "input-group mb-3"},
            div({class: "input-group-prepend", style: "float:left; width:100px"},
                span({class: "input-group-text", id: "inputGroup-sizing-default"}, "Email")),
            br(),
            inputV2({
                type: "text", id: "idEmail", name: "idEmail",
                class: "form-control",
                placeholder: "Enter your email", minlength: "3", maxlength: "60",
                required: true
            })
        ),
        br(),
        button({type: "submit", class: "btn btn-primary w-100 btn-lg"}, "Register")
    )
     */

    const myForm = UserCreateForm()
    myForm.addEventListener('submit', handleSubmit);
    mainContent.replaceChildren(
        div({class: "card"},
            div({class: "card-header"},
                h1({class: "card-title"}, "Register User")
            ),
            div({class: "card-body w-50 center"},
                myForm
            )
        )
    )
}

export default createUser