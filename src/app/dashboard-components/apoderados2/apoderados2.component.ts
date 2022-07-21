import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApoderadoService } from 'src/app/Servicios/apoderado.service';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apoderados2',
  templateUrl: './apoderados2.component.html',
  styleUrls: ['./apoderados2.component.css']
})
export class Apoderados2Component implements OnInit {

  data;
  mtitle;
  mode;
  current;
  apoderados;


  userdata = JSON.parse(localStorage.getItem("categoriesdata"));

  form = new FormGroup({
    tipoRelacion: new FormControl('', [Validators.required]),
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required])
  })

  constructor(private apoderadoService: ApoderadoService
    , private modalservice: NgbModal
  ) { }

  getData() {
    this.apoderadoService.getApoderados().subscribe(res => this.apoderados = res);
  }

  descargarReporte() {
    this.apoderadoService.descargarReporte()
      .subscribe((data: any) => {
        //
        FileSaver.saveAs(data, `Reporte-Apoderados`);
      });
  }

  submit() {
    console.log(this.form.value)
    if (this.form.valid) {
      if (this.mode) {
        this.apoderadoService.createApoderado(this.form.value).subscribe(res => {
          this.modalservice.dismissAll();
          console.log(res);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Creado con Exito!!',
            showConfirmButton: false,
            timer: 1500
          })
          this.getData()
        })
      }
      else {
        this.current.tipoRelacion = this.form.value.tipoRelacion;
        this.current.nombres = this.form.value.nombres;
        this.current.apellidos = this.form.value.apellidos;
        this.current.dni = this.form.value.dni;
        this.current.sexo = this.form.value.sexo;
        this.current.direccion = this.form.value.direccion;

        this.apoderadoService.updateApoderado(this.current, this.current.idapoderado).subscribe(res => {
          this.modalservice.dismissAll();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Editado con Exito!!',
            showConfirmButton: false,
            timer: 1500
          })
          this.getData()
        })
      }
    }
    else {
      alert("Check your information and fill in all the spaces!")
    }
  }

  edit(modal, data) {
    this.mtitle = "Actualizar Apoderado";
    this.mode = false;
    this.modalservice.open(modal);
    this.form.patchValue({
      tipoRelacion: data.tipoRelacion,
      nombres: data.nombres,
      apellidos: data.apellidos,
      dni: data.dni,
      sexo: data.sexo,
      direccion: data.direccion
    })

    this.current = data;
  }

  create(modal) {
    this.mtitle = "Nuevo Apoderado";
    this.form.reset()
    this.form.patchValue({
    })
    this.mode = true;
    this.modalservice.open(modal);
  }

  deletes(data) {
    this.apoderadoService.deleteApoderado(data.idapoderado).subscribe(res => {
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
