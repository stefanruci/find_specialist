import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, searchTerms: string): string {
    if (!searchTerms) {
      return value;
    }

    const regex = new RegExp(searchTerms, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    const highlighted = value.replace(regex, `<mark>${match[0]}</mark>`);
    return highlighted;
  }
}
