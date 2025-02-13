import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAlunosComponent } from './remove-alunos.component';

describe('RemoveAlunosComponent', () => {
  let component: RemoveAlunosComponent;
  let fixture: ComponentFixture<RemoveAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveAlunosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
