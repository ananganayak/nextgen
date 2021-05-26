import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'justsearch'
})
export class JustsearchPipe implements PipeTransform {

  transform(value: any, input: any): any {
    if (input) {
      return value.filter(val => val.toLowerCase().indexOf(input.toLowerCase()) >= 0)
    } else {
      return value;
    }
  }

}
