import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/Servicios/alumno.service';
import * as FileSaver from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApoderadoService } from 'src/app/Servicios/apoderado.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-alumnos2',
    templateUrl: './alumnos2.component.html',
    styleUrls: ['./alumnos2.component.css']
})
export class Alumnos2Component implements OnInit {


    alumnos;
    mtitle;
    mode;
    current;
    dataapoderado = []
    test

    imagen_input


    userdata = JSON.parse(localStorage.getItem("alumnosdata"));

    form = new FormGroup({
        idapoderado: new FormControl('', [Validators.required]),
        codigo: new FormControl('', [Validators.required]),
        nombres: new FormControl('', [Validators.required]),
        apellidos: new FormControl('', [Validators.required]),
        direccion: new FormControl('', [Validators.required]),
        sexo: new FormControl('', [Validators.required]),
        ciudad: new FormControl('', [Validators.required]),
        dni: new FormControl('', [Validators.required])
    })

    constructor(private alumnoService: AlumnoService, private modalservice: NgbModal, private apoderadoService: ApoderadoService) { }

    getAp() {
        this.apoderadoService.getApoderados().subscribe(res => this.dataapoderado = res);
    }

    cambiarImagen(evento) {
      this.imagen_input = evento.target.files[0]
      console.log(evento.target.files[0])
      //imagen_input
  }

    getData() {
        this.alumnoService.getAlumnos().subscribe(res => {
            this.alumnos = res;
            console.log(res)
        });
    }


    selectId(dnipacie) {
        console.log(dnipacie)
        this.form.value.idapoderado = dnipacie;
    }

    descargarReporte() {
        this.alumnoService.descargarReporte()
            .subscribe((data: any) => {
                //
                FileSaver.saveAs(data, `Reporte-Alumnos`);
            });
    }



    submit() {
      console.log(this.form.value)
      if (this.form.valid) {
          let formdata = new FormData()
          formdata.set("IdApoderado", this.form.value.idapoderado)
          formdata.set("file", this.imagen_input)
          formdata.set("Image", null)
          formdata.set("Codigo", this.form.value.codigo)
          formdata.set("Nombres", this.form.value.nombres)
          formdata.set("Apellidos", this.form.value.apellidos)
          formdata.set("Direccion", this.form.value.direccion)
          formdata.set("Ciudad", this.form.value.ciudad)
          formdata.set("Sexo", this.form.value.sexo)
          formdata.set("Dni", this.form.value.dni)

          if (this.mode) {
              this.alumnoService.createAlumno(formdata).subscribe(res => {
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
              this.alumnoService.updateAlumno(formdata, this.current.idalumno).subscribe(res => {
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
      this.mtitle = "Actualizar Alumno";
      this.mode = false;
      this.modalservice.open(modal);
      this.form.patchValue({
          // productId: data.brandId,
          // brandId: data.name,
          // categoryId: data.description,
          idapoderado: data.idapoderado,
          codigo: data.codigo,
          nombres: data.nombres,
          apellidos: data.apellidos,
          direccion: data.direccion,
          sexo: data.sexo,
          ciudad: data.ciudad,
          dni: data.dni
      })

      this.current = data;
  }
  create(modal) {
    this.mtitle = "Nuevo Alumno";
    this.form.reset()
    this.mode = true;
    this.modalservice.open(modal);
}

    deletes(data) {
        this.alumnoService.deleteAlumno(data.idalumno).subscribe(res => {
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
        this.getAp();
        this.getData();
    }

}
