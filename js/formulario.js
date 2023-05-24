const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const correo = document.getElementById("email");
const celular = document.getElementById("celular");
const asunto = document.getElementById("asunto");
const form = document.getElementById("form");
const listInputs = document.querySelectorAll(".form-group");
const listErrorInputs = document.querySelectorAll(".error")

form.addEventListener("submit", handleSubmit)

async function handleSubmit(event) {
    event.preventDefault();
    let condicion = validacionFormulario();
    if (condicion) {
        const form = new FormData(this)
        const response = await fetch(this.action, {
            method: this.method,
            body: form,
            headers: {
                'Accept': 'application/json'
            }
        })
        if (response.ok) {
            enviarFormulario();
        }
    }
}

function validacionFormulario() {
    form.firstElementChild.innerHTML = "Envianos un Mensaje!"
    let condicion = true;

    listErrorInputs.forEach((element) => {
        element.lastElementChild.innerHTML = "";
    });

    expresion = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (nombre.value.length < 1 || nombre.value.trim() == "") {
        mostrarMensajeError("nombre", "Nombre No Válido");
        condicion = false;
    }

    if (apellido.value.length < 1 || apellido.value.trim() == "") {
        mostrarMensajeError("apellido", "Apellido No Válido");
        condicion = false;
    }

    if (!expresion.test(correo.value) || correo.value.trim() == "" || correo.value.length > 50) {
        mostrarMensajeError("correo", "Email No Válido");
        condicion = false;
    }

    if (celular.value.length != 10 || celular.value.trim() == "" || isNaN(celular.value)) {
        mostrarMensajeError("celular", "Celular No Válido");
        condicion = false;
    }

    if (asunto.value.length < 1 || asunto.value.trim() == "") {
        mostrarMensajeError("asunto", "Asunto No Válido");
        condicion = false;
    }
    return condicion;
}

function mostrarMensajeError(claseInput, mensaje) {
    let elemento = document.querySelector(`.${claseInput}`);
    elemento.lastElementChild.innerHTML = mensaje;
}

function enviarFormulario() {
    form.reset();
    form.firstElementChild.innerHTML = "Gracias por Enviarnos tu Mensaje!"
}
