import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { Subject } from 'rxjs';
import { Constans } from '../constans';

@Injectable({
  providedIn: 'root'
})
export class IdentityAuthService {
  private userManager: UserManager;
  private user: User;
  private loginChangedSubject = new Subject<boolean>();

  public loginChanged = this.loginChangedSubject.asObservable();

  private get idpSettings(): UserManagerSettings {
    return {
      authority: Constans.idpAuthority,
      client_id: Constans.clientId,
      scope: "openid profile tour-manager-app",
      response_type: "code",

      post_logout_redirect_uri: `${Constans.clientRoot}/signout-callback`,
      redirect_uri: `${Constans.clientRoot}/signin-callback`,

      // userStore: new WebStorageStateStore({ store: window.localStorage }),
      // loadUserInfo: true,
      // response_mode: "query"
    }
  }

  constructor() {
    this.userManager = new UserManager(this.idpSettings);
  }

  public startAuthentication = (): Promise<void> => {
    return this.userManager.signinRedirect();
  }

  public completeAuthentication = (): Promise<void> => {
    let settings: UserManagerSettings = {
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      loadUserInfo: true,
      response_mode: "query"
    };
    let manager = new UserManager(settings);
    return this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }

  public getAccessToken = (): string => {
    return `${this.user.access_token}`;
  }

  public Authenticated = (): Promise<boolean> => {
    return this.userManager.getUser()
      .then(currentUser => {
        if (this.user !== currentUser) {
          this.loginChangedSubject.next(this.checkUser(currentUser as User));
        }

        this.user = currentUser as User;
        return this.checkUser(this.user);
      })
  }
  private checkUser = (user: User): boolean => {
    return !!user && !user.expired;
  }

  // public getUser(): Promise<User | null> {
  //   return this.userManager.getUser().then((user) =>{
  //     return user;
  //   })
  // }

}
