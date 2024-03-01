<script setup lang="ts">
import { ref } from 'vue';
import type { Nota } from '@/interface/interfaceProps';
import { generateUUID } from '@/utils/generarid'
import { addNota, deleteNota } from '@/CRUD/CRUD'


/*
añadir y modificar 


*/

const titulo = ref();
const hInicio = ref();
const hFin = ref();
const descripcion = ref();

const mostrarFormulario = ref(false);

interface props {
    nota: Nota
    fecha:string
}
const props = defineProps<props>();



const estado = ref(true);

const visible = () => {

    mostrarFormulario.value = !mostrarFormulario.value;
};
const crearNota = (): Nota => {
    const nota: Nota = {
        fecha: props.fecha,
        id: generateUUID(),
        titulo: titulo.value,
        hInicio: hInicio.value,
        hFin: hFin.value,
        descripcion: descripcion.value
    }

    return nota
}
const aniadirNota = () => {
    const nota = crearNota()

    addNota(nota)
    visible();
}


const modificarNota = (nota: Nota) => {
    titulo.value = nota.titulo
    hInicio.value = nota.hInicio
    hFin.value = nota.hFin
    descripcion.value = nota.descripcion

    visible()
}

const eliminar = (id: string) => { 
         deleteNota(props.nota.fecha,id)
}
</script>


<template>
    <!-- Botón para mostrar/ocultar el formulario -->
    <button @click="visible()">+</button>
    <div v-if="estado === true">

        <!-- Formulario con directiva v-if para controlar la visibilidad -->
        <div id="formulario" v-if="mostrarFormulario">
            <h2>Nueva nota</h2>
            <!-- Agrega tus campos de formulario aquí -->
            <label>fecha : {{ props.fecha }}</label>
            <input type="text" v-model="titulo" id="titulo" placeholder="Titulo de la nota">
            <input type="time" v-model="hInicio" id="hInicio">
            <input type="time" v-model="hFin" id="hFin">
            <input type="text" v-model="descripcion" id="descripcion" placeholder="Descripcion de la nota">
            <!-- Puedes agregar más campos según tus necesidades -->

            <!-- Botón para ocultar el formulario -->
            <button @click="aniadirNota">Guardar</button>
            <button @click="visible">Volver</button>

        </div>
            {{ props.nota.titulo }}
            <button @click="modificarNota(props.nota)"> modificar</button>
            <button @click="eliminar(props.nota.id)">borrar</button>
    </div>
</template>

<style scoped>
/* Estilo para hacer que el formulario sea visible y centrado */
#formulario {
    position: fixed;
    display: flex;
    flex-flow: column wrap;
    gap: 1.5em;
    width: 20em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.nota {
    display: flex;
    background-color: wheat;
    border: solid blueviolet 1px;
}
</style>
