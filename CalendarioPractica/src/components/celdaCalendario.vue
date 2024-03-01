<script setup lang="ts">
import {ref} from 'vue'
import type { Nota, valor } from '@/interface/interfaceProps';
import modal from '@/components/modal2.vue'

const modalVisible = ref(false)
const modificando = ref(false)
const nota= ref<Nota>();

const props = defineProps<valor>()


const modificar = (mnota:Nota) => { 
  modalVisible.value = true;
  modificando.value = true
  nota.value = mnota
}

</script>

<template>
  <div v-if="props.valor !== '- '">
    <p> {{ props.valor?.split('/')[0] }} </p>
    <div v-for="notas in props.notas" :key="notas.id" class="notas" dragable="true">
      <div class="nota">
        <div class="nota-content">
          <strong>Título:</strong> {{ notas.titulo }}<br>
          <strong>Hora de Inicio:</strong> {{ notas.hInicio }}<br>
          <strong>Hora de Fin:</strong> {{ notas.hFin }}<br>
          <strong>Descripción:</strong> {{ notas.descripcion }}<br>
        </div>
        <div class="botones">
          <button @click="modificar(notas)">modificar</button>
          <button >eliminar</button>

        </div>
      </div>
    </div>
    <modal :nota="nota" :visible="modalVisible" :modificando="modificando" />
  </div>
</template>

<style>
.notas {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nota {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
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