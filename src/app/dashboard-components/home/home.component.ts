import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoService } from 'src/app/Servicios/alumno.service';
import { ApoderadoService } from 'src/app/Servicios/apoderado.service';
import { MatriculaService } from 'src/app/Servicios/matricula.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  alumnos
  apoderados
  matriculas
  totalalumnos
  totalapoderados
  totalmatriculas


  type = 'bar';
  data = null
  options = {
    responsive: true,
    maintainAspectRatio: false
  };


  constructor(private modalser: NgbModal, private alumnoService: AlumnoService, private apoderadosService: ApoderadoService, private matriculaService: MatriculaService) { }

  mostrarAlumnos(modal) {
    this.modalser.open(modal, { size: 'lg' })
  }

  mostrarApoderados(modal){
    this.modalser.open(modal, {size: 'lg'})
  }

  mostrarMatriculas(modal){
    this.modalser.open(modal, {size: 'lg'})
  }

  getalumnossm() {
    this.alumnoService.getAlumnos().subscribe(res => this.alumnos = res)
  }

  getalumnos() {
    this.alumnoService.getAlumnos().subscribe(res => this.totalalumnos = res.length)
  }

  getapoderadossm(){
    this.apoderadosService.getApoderados().subscribe(res => this.apoderados = res)
  }

  getapoderados(){
    this.apoderadosService.getApoderados().subscribe(res => this.totalapoderados = res)
  }

  getmatriculassm(){
    this.matriculaService.getMatriculas().subscribe(res => this.matriculas = res)
  }

  getmatriculas(){
    this.matriculaService.getMatriculas().subscribe(res => this.totalmatriculas = res)
  }

  ngOnInit(): void {
    this.getalumnos()
    this.getalumnossm()
    this.getapoderados()
    this.getapoderadossm()
    this.getmatriculas()
    this.getmatriculassm()
  }

}
