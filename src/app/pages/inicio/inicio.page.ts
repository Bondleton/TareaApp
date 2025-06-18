import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
}

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  tareas: Tarea[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarTareas();
  }

  ionViewWillEnter() {
    this.cargarTareas();
  }

  cargarTareas() {
    const datos = localStorage.getItem('tareas');
    this.tareas = datos ? JSON.parse(datos) : [];
  }

  irACrearTarea() {
    this.router.navigate(['/tarea']);
  }

  irADetalles(id: number) {
    this.router.navigate([`/tarea-detalles`, id]);
  }


}
