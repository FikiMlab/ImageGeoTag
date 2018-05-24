import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedFilesComponent } from './updated-files.component';

describe('UpdatedFilesComponent', () => {
  let component: UpdatedFilesComponent;
  let fixture: ComponentFixture<UpdatedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
