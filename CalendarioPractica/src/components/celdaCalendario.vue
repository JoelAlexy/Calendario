<script setup lang="ts">
import {ref, watch} from 'vue'
import type { Nota, valor } from '@/interface/interfaceProps';
import modal from '@/components/modalCalendario.vue'
import { deleteNota } from '@/CRUD/CRUD';

const modalVisible = ref(false)
const modificando = ref(false)
const nota= ref<Nota>();

const props = defineProps<valor>()

watch(() => [props.notas],() => {

})
const modificar = () => { 
  modalVisible.value = true;
  modificando.value = true
}
const eliminarNota = (id:string) => { 
   deleteNota(id);
  
}

</script>

<template>
  <div v-if="props.valor !== '- '" class="contenedor-notas">
    <p> {{ props.valor!.split('/')[0] }} </p>
    <div v-for="notas in props.notas" :key="notas.id" class="notas" dragable="true">
      <div class="nota">
        <div class="nota-content">
          <strong>Título:</strong> {{ notas.titulo }}<br>
          <strong>Hora de Inicio:</strong> {{ notas.hInicio }}<br>
          <strong>Hora de Fin:</strong> {{ notas.hFin }}<br>
          <strong>Descripción:</strong> {{ notas.descripcion }}<br>
        </div>
        <div class="botones">
          <button @click="modificar()">modificar</button>
          <button @click="eliminarNota(notas.id)" >eliminar</button>

        </div>
      </div>
    </div>
    <modal :nota="nota"  :fecha="props.valor" :visible="modalVisible" :modificando="modificando"/>
  </div>
</template>

<style>
.contenedor-notas{
background-color: antiquewhite;
display: flex;
flex-flow: column wrap;
align-items: center;
min-width: 5em;
min-height: 10em;
}
.notas {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
  min-width: 50px;
  min-height: 5rem;
}

.nota {
  min-width: 10px;
  min-height: 100px;
  display: flex;
  flex-flow: column wrap;
  align-items: start;
  background-color: #f7e3ff;
  border: 1px solid #d0b3f8;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.nota:hover {
  background-color: #e0baff;
}

.nota-content {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

</style>