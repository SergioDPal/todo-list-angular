import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  showAddTaskForm = false;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser$.subscribe(() => {
      this.showAddTaskForm = false;
    });
  }
}
