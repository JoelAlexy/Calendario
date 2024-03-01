export interface Props{
    mes?:number
    anio?:number
    cols?:string[]
    COLS?:number
    ROWS?:number
}

export interface Nota { 
    fecha ?:string
    id: string,
    titulo: string,
    hInicio: Date,
    hFin: Date,
    descripcion:string

    
}
export interface valor {
    valor?: string
    notas: Nota[];

}
export interface propsModal {
    nota?: Nota
    visible: boolean
    fecha?: string
    modificando?: boolean
}
