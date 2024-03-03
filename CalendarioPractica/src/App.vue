<script setup lang="ts">
import calendarioMes from './components/calendarioMes.vue';
import { ref, watch } from 'vue';

const fecha = new Date();
const mes = ref<number>(fecha.getMonth() + 1);
const anio = ref<number>(fecha.getFullYear());

const meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

watch(() => [mes.value], () => {
    if (mes.value > 12 || mes.value < 1)
        mes.value = 1;
});

const siguienteMes = () => {
    mes.value = (mes.value % 12) + 1;
    if (mes.value === 1) {
        anio.value += 1;
    }
};

const anteriorMes = () => {
    mes.value = (mes.value - 2 + 12) % 12 + 1;
    if (mes.value === 12) {
        anio.value -= 1;
    }
};
</script>

<template>
    <div class="contenedor">
        <h1>Calendario</h1>
        <div class="formulario">
            <div class="mes">
                <button @click="anteriorMes" id="anterior">Anterior mes</button>
                <label for="mes">{{ mes }} {{ meses[mes - 1] }}</label>
                <button @click="siguienteMes" id="siguiente">Siguiente mes </button>
            </div>
            <div class="anio">
                <label for="anio">Año:</label>
                <input type="number" id="anio" v-model="anio" min="2000" max="2050" />
            </div>
        </div>
        <calendarioMes :mes="mes" :anio="anio" />
    </div>
</template>

<style></style>
