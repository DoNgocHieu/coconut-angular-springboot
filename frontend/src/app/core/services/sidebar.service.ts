import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private _open$ = new BehaviorSubject<boolean>(false);
  open$ = this._open$.asObservable();

  private myListChangedSource = new Subject<void>();
  myListChanged$ = this.myListChangedSource.asObservable();

  open() { this._open$.next(true); }
  close() { this._open$.next(false); }
  toggle() { this._open$.next(!this._open$.value); }

  notifyMyListChanged() {
    this.myListChangedSource.next();
  }
}
