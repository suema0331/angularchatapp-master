import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList, SnapshotAction} from "@angular/fire/database";
import {Observable} from "rxjs";
import {User} from "../../core/models/user";
import {map} from "rxjs/operators";

@Component({
  selector: 'ac-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersRef: AngularFireList<User>;
  users$: Observable<User[]>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list('/users');
  }

  ngOnInit(): void {
    this.users$ = this.usersRef.snapshotChanges().pipe(
      map((snapshots: SnapshotAction<User>[]) => {
          return snapshots.map(snapshot => { // 配列のmap
            const values = snapshot.payload.val(); // snapshotデータ取得
            return new User(values);
          });
      })
    );
  }

}
