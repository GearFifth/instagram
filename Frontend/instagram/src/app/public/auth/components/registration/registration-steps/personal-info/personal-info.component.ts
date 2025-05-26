import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {
  @Input() form!: FormGroup;
  @Output() checkEmailUniqueness = new EventEmitter<void>();

  emitCheckEmail() {
    this.checkEmailUniqueness.emit();
  }
}
