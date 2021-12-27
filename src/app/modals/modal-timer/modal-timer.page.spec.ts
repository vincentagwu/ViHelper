import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTimerPage } from './modal-timer.page';

describe('ModalTimerPage', () => {
  let component: ModalTimerPage;
  let fixture: ComponentFixture<ModalTimerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTimerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
