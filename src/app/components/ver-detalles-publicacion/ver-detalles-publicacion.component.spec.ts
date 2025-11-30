import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetallesPublicacionComponent } from './ver-detalles-publicacion.component';

describe('VerDetallesPublicacionComponent', () => {
  let component: VerDetallesPublicacionComponent;
  let fixture: ComponentFixture<VerDetallesPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDetallesPublicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetallesPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
