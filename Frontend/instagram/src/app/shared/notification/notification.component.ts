import {Component, EventEmitter, Input, Output} from '@angular/core';

export enum NotificationType {
  RESTRICTED = 'restricted',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() type: NotificationType = NotificationType.INFO;
  @Input() message: string = '';
  @Input() closable: boolean = true;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
