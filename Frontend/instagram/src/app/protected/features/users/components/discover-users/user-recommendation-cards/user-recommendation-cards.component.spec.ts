import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecommendationCardsComponent } from './user-recommendation-cards.component';

describe('UserRecommendationCardsComponent', () => {
  let component: UserRecommendationCardsComponent;
  let fixture: ComponentFixture<UserRecommendationCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRecommendationCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRecommendationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
