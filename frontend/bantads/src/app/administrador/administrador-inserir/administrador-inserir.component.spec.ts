import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorInserirComponent } from './administrador-inserir.component';

describe('AdministradorInserirComponent', () => {
  let component: AdministradorInserirComponent;
  let fixture: ComponentFixture<AdministradorInserirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorInserirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
