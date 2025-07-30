import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trancate'
})
export class TrancatePipe implements PipeTransform {

  transform(value: string, limit: number = 20, ellipsis: string ='...'): string {
    if (value.length <= limit) return value;
    return value.slice(0, limit) + ellipsis;
  }
}