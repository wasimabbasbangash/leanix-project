export class BaseInstance<T = number | string> {
    id!: number | string;
    createDt?: number;
    updateDt?: number;
}