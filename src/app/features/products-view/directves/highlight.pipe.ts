import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'highlightSearch',
	standalone: true,
	pure: false,
})
export class HighlightSearchPipe implements PipeTransform {
	public transform(value: string, predicate: string): string {
		if (!predicate) {
			return value;
		}
		return value.replace(new RegExp(predicate, 'gi'), `<mark>${predicate}</mark>`);
	}
}
