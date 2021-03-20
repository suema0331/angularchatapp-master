export class User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  initial: string;

  constructor(user: User | firebase.User) { // 自身のデータ型で初期化
    this.uid = user.uid;
    this.displayName = user.displayName;
    this.email = user.email;
    this.photoURL = user.photoURL;
    this.initial = this.displayName.slice(0, 1);
  }
}
