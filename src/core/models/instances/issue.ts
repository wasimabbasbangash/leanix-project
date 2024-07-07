import { BaseInstance } from "./base";

export class Issue extends BaseInstance{
    user?: string;
    title?: string;
    descrtiption?: string;
    state?: string;
}
