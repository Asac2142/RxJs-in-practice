import { concatMap, tap, finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(observable$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.on()),
      concatMap(() => observable$),
      finalize(() => this.off())
    );
  }

  private on() {
    this.loadingSubject.next(true);
  }

  private off() {
    this.loadingSubject.next(false);
  }
}
