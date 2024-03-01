<script setup lang="ts">
import { ref } from 'vue';
import type { Nota } from '@/interface/interfaceProps';
import { generateUUID } from '@/utils/generarid'
import { addNota, deleteNota } from '@/CRUD/CRUD'

const titulo = ref();
const hInicio = ref();
const hFin = ref();
const descripcion = ref();


interface props {
    nota?: Nota
    visible: boolean
    modificando?: boolean
}
const props = defineProps<props>();
const emit = defineEmits(['cerrarModal'])


const crearNota = () => {

}
const modificarNota = (nota: Nota) => {
    titulo.value = nota.titulo
    hInicio.value = nota.hInicio
    hFin.value = nota.hFin
    descripcion.value = nota.descripcion

}

</script>

<template>
    <button>+</button>
    <div v-if="props.modificando" id="formulario">
        <h2>Nueva nota</h2>
        <label>fecha : {{ props.nota?.fecha }}</label>
        <input type="text" v-model="titulo" id="titulo" placeholder="Titulo de la nota">
        <input type="time" v-model="hInicio" id="hInicio">
        <input type="time" v-model="hFin" id="hFin">
        <input type="text" v-model="descripcion" id="descripcion" placeholder="Descripcion de la nota">
        <div class="botones">

            <button v-if="modificando === true"> Modificar </button>
            <button v-else @click="emit('cerrarModal')">Guardar</button>
        </div>

    </div>
</template >



<style scoped > #formulario {
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
</style>

