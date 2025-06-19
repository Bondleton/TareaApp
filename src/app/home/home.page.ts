import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareaServiceService } from '../services/tarea-service.service';


interface Tarea {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  tareas: Tarea[] = [];

  constructor(
    private router: Router,
    private tareaService: TareaServiceService
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

  irADetalles(id: string) {
    this.router.navigate([`/tarea-detalles`, id]);
  }

  getTaskColor(index: number): string {
    const colors = ['#a5d6a7', '#80deea', '#ce93d8', '#ffd54f', '#ff8a80'];
    return colors[index % colors.length];
  }

  isDueSoon(dueDate: string): boolean {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  }

  eliminarTarea(id: string) {
    this.tareaService.eliminarTarea(id);
    this.cargarTareas(); // Refrescar la lista
  }

}
