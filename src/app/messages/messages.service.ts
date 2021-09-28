import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private errorSubject = new BehaviorSubject<string[]>([]);
  error$: Observable<string[]> = this.errorSubject.asObservable().pipe(
    filter((messages: string[]) => messages?.length > 0)
  );

  showErrors(...errors: string[]) {
    this.errorSubject.next(errors);
  }
}
