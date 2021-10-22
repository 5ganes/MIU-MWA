import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pageTitle: string = "Register";

  user: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    // console.log(form.value);
    this.user = {
      name: form.value.name,
      username: form.value.username,
      password: form.value.password
    };
    // console.log(this.user);
    this.userService.registerUser(this.user).then(response => {
      // console.log("game created", response);
      this.router.navigate(['/']);
    });
  }

}
