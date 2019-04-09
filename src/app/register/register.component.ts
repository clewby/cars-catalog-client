import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
        firstName: [''],
        lastName: ['']
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;

    this.authenticationService.register(
        this.registerForm.controls.userName.value, 
        this.registerForm.controls.password.value,
        this.registerForm.controls.firstName.value,
        this.registerForm.controls.lastName.value
        )
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            err => {
                this.loading = false;
            });
  }

}
