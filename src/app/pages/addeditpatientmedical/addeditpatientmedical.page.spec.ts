import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddeditpatientmedicalPage } from './addeditpatientmedical.page';

describe('AddeditpatientmedicalPage', () => {
  let component: AddeditpatientmedicalPage;
  let fixture: ComponentFixture<AddeditpatientmedicalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditpatientmedicalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddeditpatientmedicalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
