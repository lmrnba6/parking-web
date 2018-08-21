import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NetworkService {

  protected dataSource = new BehaviorSubject<boolean>(navigator.onLine);
  networkStatusObservable = this.dataSource.asObservable();
  constructor() {
    window.addEventListener('online', () => this.dataSource.next(true));
    window.addEventListener('offline', () => this.dataSource.next(false));
  }
}
