import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecommendationCardComponent } from './user-recommendation-card.component';

describe('UserRecommendationCardComponent', () => {
  let component: UserRecommendationCardComponent;
  let fixture: ComponentFixture<UserRecommendationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRecommendationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRecommendationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
