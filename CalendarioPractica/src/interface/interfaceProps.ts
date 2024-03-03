export interface Props{
    mes?:number
    anio?:number
    cols?:string[]
    COLS?:number
    ROWS?:number
}

export interface Nota { 
    fecha ?:string
    id:string,
    titulo: string,
    hInicio: string,
    hFin: string,
    descripcion:string

    
}
export interface valor {
    valor?: string
    notas:Nota[]

}
export interface propsCrear {
    fecha?: string
}
export interface propsModificar {
    nota?: Nota
}