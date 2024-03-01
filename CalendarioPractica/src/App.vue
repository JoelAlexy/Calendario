<script setup lang="ts">
import calendarioMes from './components/calendarioMes.vue';
import { ref, watch } from 'vue'

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
})


</script>
<template>
    <div class="contenedor">
        <h1>Calendario</h1>
        <div class="formulario">
            <div class="param">
                <label for="mes">Mes: {{ meses[mes - 1] }}</label>
                <input type="number" id="mes" v-model="mes" />
            </div>
            <div class="param">
                <label for="anio">Año:</label>
                <input type="number" id="anio" v-model="anio" min="2000" max="2050" />
            </div>
        </div>
    </div>
    <calendarioMes :mes="mes" :anio="anio" />
</template>

<style>
.contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(175, 246, 246);
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.formulario {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.param {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
}

h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
}
</style>