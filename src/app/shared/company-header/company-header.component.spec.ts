import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyHeaderComponent } from './company-header.component';

describe('HeaderComponent', () => {
  let component: CompanyHeaderComponent;
  let fixture: ComponentFixture<CompanyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
        RouterTestingModule
      ],
      declarations: [ CompanyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
