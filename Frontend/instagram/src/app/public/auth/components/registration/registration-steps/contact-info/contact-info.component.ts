import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent {
  @Input() form!: FormGroup;
  @Input() stepper!: MatStepper;
  @Input() checkEmailUniqueness!: (stepper: MatStepper) => void;
  @Input() stepBack!: (stepper: MatStepper, form: FormGroup) => void;

  next() {
    if (this.checkEmailUniqueness) {
      this.checkEmailUniqueness(this.stepper);
    } else {
      this.stepper.next();
    }
  }

  back() {
    if (this.stepBack) {
      this.stepBack(this.stepper, this.form);
    }
  }
}
