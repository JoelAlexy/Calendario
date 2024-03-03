<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import celdaCalendario from '@/components/celdaCalendario.vue'
import type { Props, Nota } from '@/interface/interfaceProps';
import { selectAllNota } from '@/CRUD/CRUD';
/*


*/

const listaNotas = ref<Nota[]>([]);

const sacarNotas = async () => {
  listaNotas.value = await selectAllNota();
}
const filtrarNotas = (fecha: string) => {
  return listaNotas.value.filter(el => el.fecha === fecha);

}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  COLS: 7,
  ROWS: 6,
  anio: 2000,
  mes: 1


})



//Convertimos el número de orden del día en filas y columnas
const anadevalorSecuencial = (numero: number, valor: string, celdas: string[][]) => {
  const fila = Math.floor(numero / props.COLS);
  const columna = numero % props.COLS;
  celdas[fila][columna] = valor
}



const tablaMes = computed(() => {
  const celdas = Array.from(Array(props.COLS).keys()).map(() =>
    Array.from(Array(props.ROWS + 1).keys()).map(() => '- '))
  const primerDia = new Date(`${props.anio}-${props.mes}-1`)
  const posicionPrimerDia = [6, 0, 1, 2, 3, 4, 5][primerDia.getDay()]
  const numDiasMes = new Date(props.anio, props.mes, 0).getDate()
  const rangoNumeros = [...Array(numDiasMes).keys()].map(i => i + posicionPrimerDia)
  //Recorremos el rango de números para añadir la fecha
  rangoNumeros.map((el, ind) => anadevalorSecuencial(el, `${ind + 1}/${props.mes}/${props.anio}`, celdas))

  return celdas

})

onMounted(() => {
  sacarNotas();

})
watch(() => [listaNotas.value], () => {
  sacarNotas()
})


</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="c in cols" :key="c">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in props.ROWS" :key="i">
        <th>{{ }}</th>
        <td v-for="(c, j) in cols" :key="c">

          <celdaCalendario :valor="tablaMes[i - 1][j]" :notas="filtrarNotas(tablaMes[i - 1][j])" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
body {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0;
  padding: 0;
  min-width: 1000px;
  min-height: 950px;

}

.contenedor {
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(175, 246, 246);
  gap: 1rem;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgb(0, 0, 0);
}

.formulario {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  width: 100%;
  height: 10%;
}

.mes,
.anio {
  display: flex;
  font-size: 1.1rem;
  gap: 1rem;
  border: 0.1rem solid #ccc;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.mes>#siguiente,
.mes>#anterior {
  background-color: #b8b0b0;
}

.mes>#siguiente:hover,
.mes>#anterior:hover {
  background-color: #acec9a;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  padding: 0.8rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.4rem;
  width: 100%;
  box-sizing: border-box;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 1rem;
}



th {
  background-color: #eee;
}

td {
  border: 1px solid #ccc;
  height: 1.5em;
  overflow: hidden;
}

table {
  width: 95%;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
