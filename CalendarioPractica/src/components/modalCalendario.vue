<script setup lang="ts">
import { ref } from 'vue';
import type { Nota ,propsModal} from '@/interface/interfaceProps';
import { generateUUID } from '@/utils/generarid'
import { addNota, deleteNota } from '@/CRUD/CRUD'

const titulo = ref();
const hInicio = ref();
const hFin = ref();
const descripcion = ref();



const props = defineProps<propsModal>();
const visibilidad = ref<boolean>(false)


const ocultarModal = () => {
    visibilidad.value = !visibilidad.value
}
// const emit = defineEmits(['cerrarModal'])


const crearNota = () => {
    const nuevaNota: Nota = {
        fecha: props.fecha,
        id: generateUUID(),
        titulo: titulo.value,
        hInicio: hInicio.value,
        hFin: hFin.value,
        descripcion: descripcion.value
    }

    addNota(nuevaNota)
    ocultarModal()
}
const modificarNota = (nota: Nota) => {
    titulo.value = 'hshdfa'
    hInicio.value = nota.hInicio
    hFin.value = nota.hFin
    descripcion.value = nota.descripcion
}

</script>

<template>
    <button @click="ocultarModal()">+</button>
    <div v-if="visibilidad" id="formulario">
        <h2>Nueva nota</h2>
        <label>fecha : {{ props.fecha }}</label>
        <input type="text" v-model="titulo" id="titulo" placeholder="Titulo de la nota">
        <input type="time" v-model="hInicio" id="hInicio">
        <input type="time" v-model="hFin" id="hFin">
        <input type="text" v-model="descripcion" id="descripcion" placeholder="Descripcion de la nota">
        <div class="botones">

            <button v-if="modificando == true" @click="modificarNota(props.nota!)"> Modificar </button>
            <button v-else @click="crearNota()">Guardar</button>
            <button  @click="ocultarModal()">Volver</button>

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

