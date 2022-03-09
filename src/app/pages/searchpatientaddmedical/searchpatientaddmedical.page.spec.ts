import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchpatientaddmedicalPage } from './searchpatientaddmedical.page';

describe('SearchpatientaddmedicalPage', () => {
  let component: SearchpatientaddmedicalPage;
  let fixture: ComponentFixture<SearchpatientaddmedicalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchpatientaddmedicalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchpatientaddmedicalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
