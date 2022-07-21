import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Servicios/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data;

  constructor(private adminService: AdminService, private router: Router) { }

  public formlogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  getData() {
    this.adminService.getAdmins().subscribe(res => this.data = res);
  }



  ngOnInit(): void {
    this.getData();
  }

  submit() {
    for (let i = 0; i < this.data.length; i++) {
      console.log(this.data[i].email);
      if (this.formlogin.value.email === this.data[i].email && this.formlogin.value.password === this.data[i].password) {
       console.log("Lo encontre" + this.data[i].password);
        localStorage.setItem("datosLogin", JSON.stringify(this.data[i]));
        this.router.navigateByUrl('home')
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inicio Exitoso!!',
            showConfirmButton: false,
            timer: 1500
        })
      }
    }
  }

}
