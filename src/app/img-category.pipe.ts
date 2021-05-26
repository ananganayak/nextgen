import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgCategory'
})
export class ImgCategoryPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    const returnOnlyRelatedCategoryItem = value.filter(t => t.category === args[0]);
    return returnOnlyRelatedCategoryItem;
  }

}
