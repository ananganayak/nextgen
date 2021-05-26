import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProcessName'
})
export class SearchProcessNamePipe implements PipeTransform {

  transform(value: any, input: any): any {
    if (input) {
      return value.filter(val => val['process-name'].toLowerCase().indexOf(input.toLowerCase()) >= 0)
    } else {
      return value;
    }
  }

}
