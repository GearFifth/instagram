import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class InfiniteScrollService<T> {
  private _itemsSubject = new BehaviorSubject<T[]>([]);
  private _currentPage = 0;
  private _itemsPerPage = 10;
  private _isLoading = new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  get items$(): Observable<T[]> {
    return this._itemsSubject.asObservable();
  }

  reset(): void {
    this._itemsSubject.next([]);
    this._currentPage = 0;
  }

  loadInitial(
    fetcher: (page: number, size: number) => Observable<T[]>,
    itemsPerPage = 10
  ): void {
    this._itemsPerPage = itemsPerPage;
    this._currentPage = 0;
    this._itemsSubject.next([]);
    this.loadMore(fetcher);
  }

  loadMore(fetcher: (page: number, size: number) => Observable<T[]>): void {
    this._isLoading.next(true);

    fetcher(this._currentPage, this._itemsPerPage).subscribe({
      next: (newItems: T[]) => {
        const updatedItems = [...this._itemsSubject.value, ...newItems];
        this._itemsSubject.next(updatedItems);
        this._currentPage++;
      },
      error: err => console.error(err),
      complete: () => this._isLoading.next(false)
    });
  }
}
