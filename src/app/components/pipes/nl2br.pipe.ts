import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'alNl2br',
})
export class Nl2brPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}

	transform(value: string): any {
		let result;
		if (value) {
			result = value.replace(/(?:\r\n|\r|\n)/g, '<br />');
			result = this.sanitizer.bypassSecurityTrustHtml(result);
		}

		return result ? result : value;
	}
}
