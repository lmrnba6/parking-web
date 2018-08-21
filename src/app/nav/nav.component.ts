import { Component, OnInit } from '@angular/core';
import {NetworkService} from '../_services/network.service';
import {Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  lang = 'en';
  languageText = "Fr";
  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private router: Router,
              private networkService: NetworkService,
              private translate: TranslateService) {}

  ngOnInit() {
    this.networkService.networkStatusObservable.subscribe(status => console.log(status));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  languageChange() {
    this.lang = this.lang === 'en' ? 'fr' : 'en';
    this.languageText = this.lang === 'en' ? 'Fr' : 'En';
    this.translate.use(this.lang);
  }

}
