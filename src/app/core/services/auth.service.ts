import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
    // this.afAuth.onAuthStateChanged(user => console.log(user)); // 認可機能を実装可能
  }

  login( email: string, password: string ): Promise<firebase.auth.UserCredential | void >{
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }

  logout(): Promise<void>{
    return this.afAuth.signOut(); // logout実装完了！
  }

}
