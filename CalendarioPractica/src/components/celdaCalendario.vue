<script setup lang="ts">
import { ref } from 'vue'
import { updateNota } from '@/CRUD/CRUD';
import type { valor, Nota } from '@/interface/interfaceProps';
import modalCrear from '@/components/modalCrear.vue'
import modalModificar from '@/components/modalModificar.vue'

const props = defineProps<valor>()
const arrastrando = ref<boolean>();

const esFechaDeHoy = (fecha: string) => {
  const fechaHoy = new Date().toLocaleDateString();
  return fecha === fechaHoy;
}

const onDragStart = (event: DragEvent, nota: Nota) => {
  const notaId = JSON.stringify(nota);
  event.dataTransfer!.setData('text/plain', notaId);
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer!.dropEffect = 'move';
}
const onDragEnter = () => {
  arrastrando.value = true;
  setTimeout(() => {
    arrastrando.value = false;
  }, 5000);
}

const onDrop = (event: DragEvent, fecha: string) => {
  event.preventDefault();
  const nota = event.dataTransfer!.getData('text/plain');
  const cambio = JSON.parse(nota)
  cambio.fecha = fecha;
  updateNota(cambio.id, cambio)
  // Implementa la lógica para manejar el evento de soltar aquí
  console.log('Nota soltada:', cambio);
}
</script>

<template>
  <div v-if="props.valor !== '- '" :class="[esFechaDeHoy(props.valor!) ? 'hoy' : 'contenedor-notas']"
    @dragenter="onDragEnter">
    <p> {{ props.valor!.split('/')[0] }} </p>
    <div v-for="nota in props.notas" 
    :key="nota.id" class="nota">
      <div :id="nota.id" 
      :draggable="true" 
      @dragstart="($event) =>
    onDragStart($event, nota)">
        <strong>Título:</strong> {{ nota.titulo }}<br>

        <strong>Hora de Inicio:</strong> {{ nota.hInicio }}<br>
        <strong>Hora de Fin:</strong> {{ nota.hFin }}<br>
        <strong>Descripción:</strong> {{ nota.descripcion }}<br>
      </div>
      <div v-if="props.valor !== '- '" class="botones">
        <modalModificar :nota="nota" />
      </div>
    </div>
    <div v-if="arrastrando" class="zona-soltar" id="{{props.valor!}}" :draggable="true" @dragover="onDragOver"
      @drop="($event) => onDrop($event, props.valor!)">
      <h1>soltar aqui</h1>
    </div>
    <modalCrear :fecha="props.valor" />
  </div>
</template>

<style scoped>
.contenedor-notas {
  background-color: #d3d3d3;
  display: flex;
  flex-flow: column wrap;
  align-items: center;

}

.hoy {
  border: dotted blue;
  background-color: #81c9d6;
  display: flex;
  flex-flow: column wrap;
  align-items: center;

}

.zona-soltar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #73bce6;
  min-width: 50px;
  min-height: 5rem;
}

.nota {
  display: flex;
  flex-flow: column wrap;
  margin-top: 0.5rem;
  align-items: start;
  background-color: #f7e3ff;
  border: 1px double #dd91c6;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.nota:hover {
  background-color: #e0baff;
}

.eliminar {
  background-color: #f94c4c;
}
</style>
