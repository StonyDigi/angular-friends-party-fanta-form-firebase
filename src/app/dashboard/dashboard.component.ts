import { Component } from '@angular/core';
import { QuestionnaireService } from '../questionnaire.service';
import { Questionnaire } from '../questionnaire';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  timeSlots: string[] = ['2023.08.04-tól, 2023.08.06-ig.', '2023.09.01-tól, 2023.09.03-ig.'];
  selectedTimeSlot: string | undefined;
  actual: Questionnaire = new Questionnaire();
  
  constructor(public service: QuestionnaireService) {

  }

  alreadyRegistered(): boolean {
    const isRegistered = this.service.questionnaires.some(
      (data) => data.timeSlot === this.actual.timeSlot && data.name === this.actual.name
    );
    return isRegistered;
  }

  submitForm() {
    if (this.alreadyRegistered()) {
      // Már jelentkezett erre az időpontra, nem engedélyezzük az újbóli beküldést
      return;
    }
    if (this.service.questionnaires.some((data) => data.name === this.actual.name)) {
      // Ugyanazzal a névvel már jelentkeztek más időpontra, nem engedélyezzük az újbóli beküldést
      return;
    }
    this.service.create(this.actual);
  }

  clearForm() {
    this.service.clearForm();
  }
}