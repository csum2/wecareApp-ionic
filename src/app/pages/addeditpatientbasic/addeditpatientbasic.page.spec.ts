import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddeditpatientbasicPage } from './addeditpatientbasic.page';

describe('AddeditpatientbasicPage', () => {
  let component: AddeditpatientbasicPage;
  let fixture: ComponentFixture<AddeditpatientbasicPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditpatientbasicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddeditpatientbasicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
