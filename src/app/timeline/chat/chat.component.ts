import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from '../../core/models/comment';
import { User } from '../../core/models/user';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  currentUser: User;
  currentUser$: Observable<User>;
  comment = '';
  // item$: Observable<any>;
  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>; // interface AngularFireList<T>

  // serviceをDI
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    ) {
    // ./itemから単一のデータ取得
    // valueChangesで取得データを Observableに変更
    // this.item$ = db.object('/item').valueChanges();
    this.commentsRef = db.list('/comments'); // commentsRefには list参照が格納
    // this.comments$ = this.commentsRef.valueChanges(); // valueChangesは実データのみ取得

  }

  ngOnInit(): void {
    this.currentUser$ = this.afAuth.authState.pipe(
      map((user: firebase.User | null ) => {
        if (user){
          this.currentUser = new User(user);
          return this.currentUser; // User Classのインスタンス代入
        }
        return null;
      })
    );
    this.comments$ = this.commentsRef.snapshotChanges()  // キーを含めたメタデータも取得
      .pipe(
        map((snapshots: SnapshotAction<Comment>[]) => {
          return snapshots.map( snapshot => {
            const value = snapshot.payload.val(); // snapshotメタデータから実データ取得
            return new Comment({ key: snapshot.payload.key, ...value });
          });
        })
      );
  }

  addComment(comment: string): void{
    if (comment){
      this.commentsRef.push(new Comment({user: this.currentUser, message: comment })); // commentをDBに保存
      this.comment = '';
    }
  }

  updateComment(comment: Comment): void{
    const {key, message } = comment;
    this.commentsRef.update( key, { message }); // realtimeDBのリスト参照（commentsRef）のupdate
  }

  deleteComment(comment: Comment): void{
    this.commentsRef.remove(comment.key);
  }


}
