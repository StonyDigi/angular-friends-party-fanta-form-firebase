import { Guid } from "guid-typescript";

export class Questionnaire {
    id: string = Guid.create().toString();
    name: string = '';
    timeSlot: string = '';
    date: string =  new Date().toString();
}