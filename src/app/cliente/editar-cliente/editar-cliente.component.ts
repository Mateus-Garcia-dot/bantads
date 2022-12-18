import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { CrudClienteService } from '../services/crud-cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {
  @ViewChild('formEdit') formEdit!: NgForm

  senha = ""
  cliente = new Cliente()
  endereco = new Endereco()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crudCliente: CrudClienteService,
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.cliente = await this.crudCliente.getCliente(Number(params.get('id')))
    });
  }

  async onSubmit() {
    if (!this.formEdit.valid) {
      this.formEdit.control.markAllAsTouched()
      return
    }
    await this.crudCliente.updateCliente(this.cliente,this.senha)
    this.router.navigate(['/']);
  }
}
