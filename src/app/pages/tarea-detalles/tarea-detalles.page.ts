import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaServiceService } from 'src/app/services/tarea-service.service';

interface Tarea {
 id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
}

@Component({
  selector: 'app-tarea-detalles',
  standalone: false,
  templateUrl: './tarea-detalles.page.html',
  styleUrls: ['./tarea-detalles.page.scss'],
})
export class TareaDetallesPage implements OnInit {

  tarea!: Tarea;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareaService: TareaServiceService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const t = this.tareaService.obtenerTareaPorId(id);
      if (t) {
        this.tarea = { ...t }; // Clonar para editar
      } else {
        alert('Tarea no encontrada');
        this.router.navigate(['/home']);
      }
    }
  }

  guardarCambios() {
    // if (!this.tarea.nombre || !this.tarea.descripcion || new Date(this.tarea.fecha) <= new Date()) {
    //   alert('Completa correctamente los campos (fecha futura, sin vacíos)');
    //   return;
    // }
    // this.tareaService.actualizarTarea(this.tarea.id, this.tarea);
    // alert('Tarea actualizada con éxito');
    this.router.navigate(['/home']);
  }

}
