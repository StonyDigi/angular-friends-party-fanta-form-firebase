import { Injectable } from '@angular/core';
import { Questionnaire } from './questionnaire';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  
  questionnaires: Array<Questionnaire> = new Array<Questionnaire>();
  selectedTimeSlot: string | undefined;
  name: string | undefined;
  submitted: boolean | undefined;
  constructor(private db: AngularFireDatabase) { 
    this.clearForm();
    db.list<Questionnaire>('questionnaires').valueChanges().subscribe(t => {
      this.questionnaires = t;
    })
   }

   create(t: Questionnaire) {
    this.db.list('questionnaires').push(t);
    this.submitted = true;
   }

   clearForm(): void {
    this.name = '';
    this.selectedTimeSlot = '';
    this.submitted = false;
  }

}