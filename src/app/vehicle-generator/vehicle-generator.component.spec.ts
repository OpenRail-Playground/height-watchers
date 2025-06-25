import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleGeneratorComponent } from './vehicle-generator.component';

describe('VehicleGeneratorComponent', () => {
  let component: VehicleGeneratorComponent;
  let fixture: ComponentFixture<VehicleGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
