<script setup lang="ts">
import { ref } from 'vue';
import type { Nota, propsModificar } from '@/interface/interfaceProps';
import { updateNota, deleteNota } from '@/CRUD/CRUD'

const titulo = ref<string>();
const hInicio = ref<string>();
const hFin = ref<string>();
const descripcion = ref<string>();
const fecha = ref();
const mostrarFormulario = ref(false);


const props = defineProps<propsModificar>();

const visible = () => {
    mostrarFormulario.value = !mostrarFormulario.value;
};


const modificarNota = (nota: Nota) => {
    fecha.value = nota.fecha
    titulo.value = nota.titulo
    hInicio.value = nota.hInicio
    hFin.value = nota.hFin
    descripcion.value = nota.descripcion
    visible()
}
const modificar = () => {
    const nota: Nota = {
        fecha: fecha.value,
        id: props!.nota!.id,
        titulo: titulo.value!,
        hInicio: hInicio.value!,
        hFin: hFin.value!,
        descripcion: descripcion.value!
    }
    visible()

    updateNota(props.nota!.id, nota)
}

const eliminar = (id: string) => {
    deleteNota(id)
}
</script>


<template>
    <!-- Formulario con directiva v-if para controlar la visibilidad -->
    <div class="contenedor-modificar">
        <div id="formulario" v-if="mostrarFormulario">
            <h2>Modificando Nota</h2>
            <!-- Agrega tus campos de formulario aquí -->
            <label for="fecha">Fecha:</label>
            <input type="text" v-model="fecha" id="fecha">

            <label for="titulo">Título de la nota:</label>
            <input type="text" v-model="titulo" id="titulo" placeholder="Titulo de la nota">

            <label for="hInicio">Hora de Inicio:</label>
            <input type="time" v-model="hInicio" id="hInicio">

            <label for="hFin">Hora de Fin:</label>
            <input type="time" v-model="hFin" id="hFin">

            <label for="descripcion">Descripción de la nota:</label>
            <input type="text" v-model="descripcion" id="descripcion" placeholder="Descripcion de la nota">
            <div class="botones">
                <button @click="modificar()">modificar</button>
                <button @click="visible()">Volver</button>
            </div>
        </div>
        <div class="btn-contenedor">
            <button @click="modificarNota(props.nota!)" id="btn-modificar"> modificar</button>
            <button @click="eliminar(props.nota!.id)" id="btn-eliminar">borrar</button>
        </div>
    </div>
</template>

<style scoped>
.contenedor-modificar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.contenedor-modificar .btn-contenedor {
    align-self: center;
}
.btn-contenedor{
    display: flex;
}

#formulario {
    position: fixed;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-items: center;
    align-self: center;
    gap: 1em;
    width: 20em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #d3d3d3;
    border: 1px double #dd91c6;
    box-shadow: 10px 10px 10px 10px rgba(245, 169, 230, 0.748);
    z-index: 1000;
}

#formulario h2 {
    background-color: #ccebf8;
    margin-bottom: 10px;
    border: white dotted;
    border-radius: 15px;
}

#formulario input {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px dashed #ccc;
    border-radius: 50px;
    font-family: 'Courier New';
    font-size: large;
}

#formulario label {
    align-self: center;
    align-content: center;
    justify-content: center;
  width: 20rem;
    font-size: 1.4rem;
    background-color: #ccebf8;
}
#formulario button {
    padding: 10px;
    background-color: #4b4b4b;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

#formulario button:hover {
    background-color: #45a049;
}


/* Estilo para botones fuera del formulario */
#btn-modificar {
    padding: 10px;
    background-color: #6ce058;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

#btn-modificar:hover {
    background-color: #05f909;
}

#btn-eliminar {
    padding: 10px;
    background-color: #f94c4c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

#btn-eliminar:hover {
    background-color: #f90505;
}
</style>
