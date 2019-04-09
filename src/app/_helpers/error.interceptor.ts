import { Injectable } from '@angular/core';
import { HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_auth/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private toastrService: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {
            if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred. Handle it accordingly.
              this.toastrService.error('An error occurred:', error.error.message);
            } else {
              // The backend returned an unsuccessful response code.
    
              if (error.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
              }
    
              this.toastrService.error(`Backend returned code ${error.status}, message was: ${error.error.message}`);
            }
            // return an observable with a user-facing error message
            const err = error.error.message || error.statusText;
            return throwError(err);
          }))
    }
}