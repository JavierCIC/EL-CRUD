let listaPrestamos = []
let indiceEdicion = null

const campoNombre    = document.getElementById('nombreAlumno')
const campoMaterial  = document.getElementById('materialSeleccionado')
const campoDevuelto  = document.getElementById('materialDevuelto')
const botonGuardar   = document.getElementById('botonGuardar')
const botonCancelar  = document.getElementById('botonCancelar')
const contenedor     = document.getElementById('contenedorPrestamos')
const tituloForm     = document.getElementById('tituloFormulario')

// C de CRUD
function guardarPrestamo() {
    const nombre       = campoNombre.value.trim()
    const material     = campoMaterial.value
    const turnoMarcado = document.querySelector('input[name="turnoPrestamo"]:checked')
    const devuelto     = campoDevuelto.checked

    if (nombre === '' || material === '' || !turnoMarcado) {
        alert('Debes completar todos los campos obligatorios')
        return
    }

    const prestamo = {
        nombre:   nombre,
        material: material,
        turno:    turnoMarcado.value,
        devuelto: devuelto
    }

    if (indiceEdicion === null) {
        listaPrestamos.push(prestamo)
    } else {
        listaPrestamos[indiceEdicion] = prestamo
        salirModoEdicion()
    }

    limpiarFormulario()
    mostrarPrestamos()
}

// R de CRUD
function mostrarPrestamos() {
    contenedor.innerHTML = ''

    if (listaPrestamos.length === 0) {
        contenedor.innerHTML = '<p id="mensajeVacio">No hay prestamos registrados</p>'
        return
    }

    listaPrestamos.forEach(function(prestamo, indice) {
        const badgeClass = prestamo.devuelto ? 'badge-si' : 'badge-no'
        const badgeTexto = prestamo.devuelto ? 'Si' : 'No'

        contenedor.innerHTML += `
        <div class="tarjeta">
            <div class="tarjeta-fila">
                <span class="tarjeta-label">Alumno</span>
                <span class="tarjeta-valor">${prestamo.nombre}</span>
            </div>
            <div class="tarjeta-fila">
                <span class="tarjeta-label">Material</span>
                <span class="tarjeta-valor">${prestamo.material}</span>
            </div>
            <div class="tarjeta-fila">
                <span class="tarjeta-label">Turno</span>
                <span class="tarjeta-valor">${prestamo.turno}</span>
            </div>
            <div class="tarjeta-fila">
                <span class="tarjeta-label">Devuelto</span>
                <span class="tarjeta-valor">
                    <span class="badge-devuelto ${badgeClass}">${badgeTexto}</span>
                </span>
            </div>
            <div class="tarjeta-acciones">
                <button class="btn-editar" onclick="editarPrestamo(${indice})">Editar</button>
                <button class="btn-borrar" onclick="borrarPrestamo(${indice})">Borrar</button>
            </div>
        </div>
        `
    })
}

// U de CRUD
function editarPrestamo(indice) {
    const prestamo = listaPrestamos[indice]

    campoNombre.value     = prestamo.nombre
    campoMaterial.value   = prestamo.material
    campoDevuelto.checked = prestamo.devuelto

    const radio = document.querySelector(`input[name="turnoPrestamo"][value="${prestamo.turno}"]`)
    if (radio) {
        radio.checked = true
    }

    indiceEdicion = indice
    botonGuardar.textContent    = 'Guardar cambios'
    botonCancelar.style.display = 'inline'
    tituloForm.textContent      = 'Editar prestamo'
}

// D de CRUD
function borrarPrestamo(indice) {
    listaPrestamos.splice(indice, 1)
    mostrarPrestamos()
}

function cancelarEdicion() {
    salirModoEdicion()
    limpiarFormulario()
}

function salirModoEdicion() {
    indiceEdicion               = null
    botonGuardar.textContent    = 'Añadir prestamo'
    botonCancelar.style.display = 'none'
    tituloForm.textContent      = 'Añadir prestamo'
}

function limpiarFormulario() {
    campoNombre.value     = ''
    campoMaterial.value   = ''
    campoDevuelto.checked = false
    document.querySelectorAll('input[name="turnoPrestamo"]').forEach(function(radio) {
        radio.checked = false
    })
}

mostrarPrestamos()
