import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoAlunosComponent } from './alteracao-alunos.component';

describe('AlteracaoAlunosComponent', () => {
  let component: AlteracaoAlunosComponent;
  let fixture: ComponentFixture<AlteracaoAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlteracaoAlunosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlteracaoAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
