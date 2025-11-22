import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toYYYYmmdd'
})
export class NormalizeDatePipePipe implements PipeTransform {

  transform(value: string | Date): string {
    if(!value) return '';

    const date = new Date(value);
    if(isNaN(date.getTime())) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDay()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
