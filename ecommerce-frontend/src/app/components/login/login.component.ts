import {Component, OnInit} from '@angular/core';
import myAppConfig from '../../config/my-app-config';
import {OktaAuthService} from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignIn: any;

  constructor(private oktaAuthService: OktaAuthService) {
    this.oktaSignIn = new OktaSignIn({
        logo: 'asset/images/logo.png',
        baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
        clientId: myAppConfig.oidc.clientId,
        redirectUri: myAppConfig.oidc.redirectUri,
        authPrams: {
          pkce: true,
          issuer: myAppConfig.oidc.issuer,
          scopes: myAppConfig.oidc.scopes
        }
      }
    );
  }

  ngOnInit(): void {
    this.oktaSignIn.remote();
    this.oktaSignIn.renderEl({
        el: '#okta-sign-in-widget'
      },
      (response) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error) => {
        throw  error;
      }
    );
  }

}
