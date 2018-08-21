import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      this.handleError(err.status)
      const error = err.error.message || err.statusText;
      this.showError(error);
      return throwError(error);
    }));
  }

  public handleError(error: any) {
    console.error(error);
    switch (error) {
      case 401:
        this.authenticationService.logout();
        this.router.navigateByUrl('/login');
        break;
      case 403:
        this.router.navigateByUrl('/unauthorized');
        break;
      default:
        this.showError(error);
    }
  }

  private showError(message: string) {
    // this.toastManager.error(message, this.DEFAULT_ERROR_TITLE, {dismiss: 'controlled'}).then((toast: Toast) => {
    //   let currentToastId: number = toast.id;
    //   this.toastManager.onClickToast().subscribe(clickedToast => {
    //     if (clickedToast.id === currentToastId) {
    //       this.toastManager.dismissToast(toast);
    //       window.location.reload();
    //     }
    //   });
    // });
    alert(message);
  }
}
