import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAutocadastroComponent } from './cliente-autocadastro.component';

describe('ClienteAutocadastroComponent', () => {
  let component: ClienteAutocadastroComponent;
  let fixture: ComponentFixture<ClienteAutocadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteAutocadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteAutocadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
