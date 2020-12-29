import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToernooiDetailPage } from './toernooi-detail.page';

describe('ToernooiDetailPage', () => {
  let component: ToernooiDetailPage;
  let fixture: ComponentFixture<ToernooiDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToernooiDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToernooiDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
