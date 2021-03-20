import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {}
  canActivate( // ページ遷移をチェックするメソッド
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.afAuth.authState.pipe(
      map((user: firebase.User) => {
        if (!user) {
          return true;
        } else {
          // this.router.navigateByUrl('/'); // topにリダイレクト
          // return false;
          console.log(this.router.parseUrl('/'));
          return this.router.parseUrl('/');
        }
      })
    );
  }

}
