import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
  ) { }

  // promiseは非同期を処理するオブジェク
  create(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        const {user} = credential;
        const actionCodeSettings = {
          url: `http://localhost:4200/?newAccount=true&email=${user.email}` // 認証後topに遷移、クエリパラメータをつけてメール認証をしたか確認
        };
        user.sendEmailVerification(actionCodeSettings); // 確認メール
        this.db.object(`/users/${user.uid}`).set(new User(user)); // realtimedb更新 インスタンスをわたし必要なデータを自動保存
      });
  }

  update(values: { displayName?: string, photoURL?: string}): Promise<void>{
    return this.afAuth.currentUser.then((user: firebase.User | null) => {
      if (user) {
        user.updateProfile(values) // firebaseAuthのuserdataを更新
          .then(() => this.db.object(`/users/${user.uid}`).update(values)) // realtimedbのdisplayName更新
          .catch(error => console.log(error));
      }
    });
  }
}
