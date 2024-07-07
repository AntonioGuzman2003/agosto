import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { Cita } from '../../Modelo/Cita';
import { Paciente } from '../../Modelo/Paciente';

@Component({
  selector: 'app-listar-cita',
  templateUrl: './listar-cita.component.html',
  styleUrls: ['./listar-cita.component.css']
})
export class ListarCitaComponent implements OnInit {
  citas: Cita[] = [];
  pacientes: Paciente[] = [];
  pacienteMap: Map<number, string> = new Map();

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit() {
    this.service.getCitas().subscribe((data: Cita[]) => {
      this.citas = data;
      this.loadPacientes();
    });
  }

  loadPacientes() {
    this.service.getPacientes().subscribe((data: Paciente[]) => {
      this.pacientes = data;
      this.pacientes.forEach(paciente => {
        this.pacienteMap.set(paciente.id, paciente.nombre);
      });
    });
  }

  getPacienteNombre(id: number): string {
    return this.pacienteMap.get(id) || 'Unknown';
  }

  editarCita(id: number) {
    this.router.navigate(["editarcita", id]);
  }

  Delete(cita: Cita) {
    this.service.deleteCita(cita.id).subscribe(data => {
      this.citas = this.citas.filter(c => c !== cita);
      alert("Cita eliminada");
    });
  }

  Nuevocita() {
    this.router.navigate(["addcita"]);
  }
}
