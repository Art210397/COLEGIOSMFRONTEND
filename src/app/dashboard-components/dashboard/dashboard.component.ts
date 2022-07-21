import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }



  validarcuenta() {
    const datos = localStorage.getItem("datosLogin")
    if (datos) {
      return true
    }
    else {
      return false
    }
  }

  ngOnInit(): void {
  }

}
