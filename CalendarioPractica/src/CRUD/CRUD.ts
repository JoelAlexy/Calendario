import type { Nota } from "@/interface/interfaceProps";
import axios from "axios";

export const BASEURL = "http://localhost:3000";

// Function using axios to work with JSON
export async function addNota( dato: any) {
    try {
        await axios.post(`${BASEURL}/notas`, dato);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteNota( id: string) {
    try {
        await axios.delete(`${BASEURL}/notas/${id}`);
    } catch (error) {
        console.error(error);
    }
}

export async function updateNota( id: string, nuevoDato: any) {
    try {
        await axios.patch(`${BASEURL}/notas/${id}`, nuevoDato);
    } catch (error) {
        console.error(error);
    }
}

export async function selectAllNota() {
    try {
        const response = await axios.get(`${BASEURL}/notas/`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function selectNota(tabla: string, fecha: string) {
    try {
        const response = await axios.get(`${BASEURL}/${tabla}/${fecha}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
