import {formatDate} from "@angular/common";
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentDate'
})
export class CommentDatePipe implements PipeTransform {

  // データを処理する方法（value:渡ってきたテンプレートのデータ ...args：pipeのオプション）
  transform(value: number, ...args: string[]): string {
    const format = args[0] || 'yyyy年MM月dd日 HH:mm';
    return formatDate(value, format, 'en-US'); // angularのdatePipe関数
  }

}
