import { Injectable } from '@angular/core';

interface Tarea {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareaServiceService {

  constructor() { }

  private storageKey = 'tareas';

  obtenerTareas(): Tarea[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  obtenerTareaPorId(id: string): Tarea | undefined {
    const tareas = this.obtenerTareas();
    return tareas.find(t => t.id === id);
  }

  actualizarTarea(id: string, tareaActualizada: Tarea): void {
    const tareas = this.obtenerTareas();
    const index = tareas.findIndex(t => t.id === id);
    if (index !== -1) {
      tareas[index] = tareaActualizada;
      localStorage.setItem(this.storageKey, JSON.stringify(tareas));
    }
  }

  eliminarTarea(id: string): void {
    const tareas = this.obtenerTareas();
    const tareasActualizadas = tareas.filter(t => t.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(tareasActualizadas));
  }
}
