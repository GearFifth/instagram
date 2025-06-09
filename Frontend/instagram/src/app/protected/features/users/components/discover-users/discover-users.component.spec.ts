import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverUsersComponent } from './discover-users.component';

describe('DiscoverUsersComponent', () => {
  let component: DiscoverUsersComponent;
  let fixture: ComponentFixture<DiscoverUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscoverUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscoverUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
