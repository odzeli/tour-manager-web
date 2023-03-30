import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IdentityAuthService } from '../identity/identity-auth.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private readonly oidcAuthService: IdentityAuthService,
        private readonly router: Router
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

            const accessToken = this.oidcAuthService.getAccessToken();
            const headers = req.headers.set(
                'Authorization',
                `Bearer ${accessToken}`
            );
            const authReq = req.clone({ headers });

            return next.handle(authReq).pipe(
                tap(
                    () => {},
                    error => {
                        const respError = error as HttpErrorResponse;
                        if (
                            respError &&
                            (respError.status === 401 ||
                                respError.status === 403)
                        ) {
                            debugger;
                            this.router.navigate(['/unauthorized']);
                        }
                    }
                )
            );
    }
}
