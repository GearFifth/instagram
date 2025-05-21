import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchBarComponent } from './user-search-bar.component';

describe('UserSearchBarComponent', () => {
  let component: UserSearchBarComponent;
  let fixture: ComponentFixture<UserSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSearchBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
