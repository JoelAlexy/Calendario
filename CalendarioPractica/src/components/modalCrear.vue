<script setup lang="ts">
import { ref } from 'vue';
import type { Nota, propsCrear } from '@/interface/interfaceProps';
import { generateUUID } from '@/utils/generarid'
import { addNota } from '@/CRUD/CRUD'

const titulo = ref<string>();
const hInicio = ref<string>();
const hFin = ref<string>();
const descripcion = ref<string>();



const props = defineProps<propsCrear>();
const visibilidad = ref<boolean>(false)


const ocultarModal = () => {
    visibilidad.value = !visibilidad.value

}
const limpiarModal = () => {
    titulo.value = ''
    hInicio.value = ''
    hFin.value = ''
    descripcion.value = ''
};

const crearNota = () => {
    const nuevaNota: Nota = {
        fecha: props.fecha,
        id: generateUUID(),
        titulo: titulo.value!,
        hInicio: hInicio.value!,
        hFin: hFin.value!,
        descripcion: descripcion.value!
    }

    addNota(nuevaNota)
    ocultarModal()
    limpiarModal()
}

</script>

<template>
    <button @click="ocultarModal()" id="mostrar">+</button>
    <div v-if="visibilidad" id="formulario">
        <h2>Nueva nota</h2>
        <label>fecha : {{ props.fecha }}</label>
        <input type="text" v-model="titulo" id="titulo" placeholder="Titulo de la nota">
        <input type="time" v-model="hInicio" id="hInicio">
        <input type="time" v-model="hFin" id="hFin">
        <textarea v-model="descripcion" id="descripcion" placeholder="Descripción de la nota"></textarea>

        <div class="botones">
            <button @click="crearNota()">Guardar</button>
            <button @click="ocultarModal()">Volver</button>
        </div>

    </div>
</template>


<style scoped>
/* Estilo para hacer que el formulario sea visible y centrado */
#formulario {
    position: fixed;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    gap: 1.5em;
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
    padding: 10px;
}

#formulario label {
    font-size: x-large;
    margin-bottom: 5px;
}

#formulario input {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px dashed #ccc;
    border-radius: 50px;
    font-family: 'Courier New';
    font-size: large;
}

#formulario .botones {
    display: flex;
    gap: 10px;
}

#formulario button {
    padding: 10px;
    background-color: #4b4b4b;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

#formulario button:hover {
    background-color: #45a049;
}

/* Estilo para botones fuera del formulario */
#mostrar {
    padding: 10px;
    background-color: #2795d0;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    width: 4rem;
}

#mostrar:hover {
    background-color: #057bf9;
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

#descripcion {
    padding: 8px;
    border: 1px dashed #ccc;
    border-radius: 4px;
    font-size: large;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    min-height: 100px;
    overflow-y: auto;
    /* Hace que aparezca la barra de desplazamiento vertical cuando es necesario */
    scrollbar-width: thin;
    /* Ancho de la barra de desplazamiento (puedes ajustarlo según tus preferencias) */
    scrollbar-color: #888 #ddd;
}
</style>
