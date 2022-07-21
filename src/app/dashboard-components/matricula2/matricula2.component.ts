import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatriculaService } from 'src/app/Servicios/matricula.service';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import { AlumnoService } from 'src/app/Servicios/alumno.service';
import { ApoderadoService } from 'src/app/Servicios/apoderado.service';

@Component({
  selector: 'app-matricula2',
  templateUrl: './matricula2.component.html',
  styleUrls: ['./matricula2.component.css']
})
export class Matricula2Component implements OnInit {


  data;
  mtitle;
  mode;
  current;
  matriculas;
  dataapoderado;
  dataalumno;

  userdata = JSON.parse(localStorage.getItem("categoriesdata"));

  form = new FormGroup({
    idapoderado: new FormControl('', [Validators.required]),
    idalumno: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
    ieprocedencia: new FormControl('', [Validators.required])
  })

  constructor(private matriculaService: MatriculaService, private modalservice: NgbModal, private alumnoService: AlumnoService, private apoderadoService: ApoderadoService) { }

  getData() {
    this.matriculaService.getMatriculas().subscribe(res => this.matriculas = res);
  }

  getAp() {
    this.apoderadoService.getApoderados().subscribe(res => this.dataapoderado = res);
  }

  getAl() {
    this.alumnoService.getAlumnos().subscribe(res => this.dataalumno = res);
  }

  selectAp(dnipacie) {
    console.log(dnipacie)
    this.form.value.idapoderado = dnipacie;
  }

  selectAl(dnipacie) {
    console.log(dnipacie)
    this.form.value.idalumno = dnipacie;
  }

  descargarReporte() {
    this.matriculaService.descargarReporte()
      .subscribe((data: any) => {
        //
        FileSaver.saveAs(data, `Reporte-Matricula`);
      });
  }

  submit() {
    if (this.form.valid) {
      if (this.mode) {
        this.matriculaService.createMatricula(this.form.value).subscribe(res => {
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
        this.current.idapoderado = this.form.value.idapoderado;
        this.current.idalumno = this.form.value.idalumno;
        this.current.codigo = this.form.value.codigo;
        this.current.ieprocedencia = this.form.value.ieprocedencia;

        this.matriculaService.updateMatricula(this.current, this.current.idmatricula).subscribe(res => {
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
      idapoderado: data.idapoderado,
      idalumno: data.idalumno,
      codigo: data.codigo,
      ieprocedencia: data.ieprocedencia
    })

    this.current = data;
  }

  create(modal) {
    this.mtitle = "Nueva Matricula";
    this.form.reset()
    this.form.patchValue({
    })
    this.mode = true;
    this.modalservice.open(modal);
  }

  deletes(data) {
    this.matriculaService.deleteMatricula(data.idmatricula).subscribe(res => {
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
    this.getAp();
    this.getAl();
  }
}
