import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/Servicios/logs.service';
import * as FileSaver from 'file-saver';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  data;
  mtitle;
  mode;
  current;
  logs;



  userdata = JSON.parse(localStorage.getItem("categoriesdata"));

  form = new FormGroup({
    url: new FormControl('', [Validators.required]),
    request: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    exception: new FormControl('', [Validators.required]),
    method: new FormControl('', [Validators.required]),
  })

  constructor(private logsService : LogsService, private modalservice: NgbModal) { }

  getData() {
    this.logsService.getLogs().subscribe(res => this.logs = res);
  }


  descargarReporte() {
    this.logsService.descargarReporte()
      .subscribe((data: any) => {
        //
        FileSaver.saveAs(data, `Reporte-Logs`);
      });
  }

  deletes(data) {
    this.logsService.deleteLogs(data.logId).subscribe(res => {
      this.modalservice.dismissAll();
    })
    Swal.fire({
      title: 'Esta seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.getData()
        Swal.fire(
          'Deleted!',
          'Registro Eliminado con Exito!!!.',
          'success'
        )
      }
    })
  }

  ngOnInit(): void {
    this.getData();
  }

}
