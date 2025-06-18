import { Component, OnInit } from '@angular/core';
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
    titulo: '',
    descripcion: '',
    fecha: ''
  };

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  async guardarTarea() {
    const { titulo, descripcion, fecha } = this.tarea;

    if (!titulo || !descripcion || !fecha) {
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
      id: Date.now(),
      ...this.tarea
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
