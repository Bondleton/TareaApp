import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tarea',
  standalone: false,
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage {

  tarea = {
    nombre: '',
    descripcion: '',
    fecha: ''
  };

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  async guardarTarea() {
    const { nombre, descripcion, fecha } = this.tarea;

    if (!nombre || !descripcion || !fecha) {
      this.mostrarAlerta('Todos los campos son obligatorios.');
      return;
    }

    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    if (fechaSeleccionada <= hoy) {
      this.mostrarAlerta('La fecha de vencimiento debe ser futura.');
      return;
    }

    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const nuevaTarea = {
      id: Date.now().toString(), // ID como string
      ...this.tarea              // incluye nombre, descripción y fecha
    };

    tareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    this.router.navigate(['/home']);
  }

  async mostrarAlerta(mensaje: string) {
    const alerta = await this.alertCtrl.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alerta.present();
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}
