import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { IdentityAuthService } from '../identity/identity-auth.service';

@Injectable()
export class OidcAuthGuard implements CanActivate {

  constructor(private identityAuthService: IdentityAuthService) { }

  canActivate(): Promise<boolean> {
    return this.authenticationChecker();
  }


  private authenticationChecker(){
    return this.identityAuthService.Authenticated().then(authenticated => {
      if(authenticated){
        return true;
      }
      else{
        this.identityAuthService.startAuthentication();
      }
      return false;
    })
  }
}
