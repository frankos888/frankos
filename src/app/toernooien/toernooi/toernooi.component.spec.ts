import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToernooiComponent } from './toernooi.component';

describe('ToernooiComponent', () => {
  let component: ToernooiComponent;
  let fixture: ComponentFixture<ToernooiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToernooiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToernooiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
