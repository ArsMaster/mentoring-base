import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(phoneNumber: string): string {
    if (!phoneNumber) return '';
    return phoneNumber.replace(/[- ]/g, '');
  }
}