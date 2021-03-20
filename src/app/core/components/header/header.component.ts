import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ac-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    // 切り替わるたびにcallback実行し、userオブジェクトを受け取る
    this.afAuth.onAuthStateChanged((user: firebase.User) => { // login状態をcheck
      this.isLogin = !!user; // !!でbooleanに変換、ログイン時userオブジェクトを受け取る（true）
    });
  }

  logout(): void {
    this.authService.logout()
      .then(() => this.router.navigateByUrl('/login'));
  }

}
