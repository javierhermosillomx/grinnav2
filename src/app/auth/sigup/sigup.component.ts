import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent {
  // isLoading = false;

  constructor(public authService: AuthService) {}

  onSingupSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.authService.createUser(form.value.name, form.value.email, form.value.password, 'admin');
  }
}
