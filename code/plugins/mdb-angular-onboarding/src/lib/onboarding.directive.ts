import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { MdbOnboardingService } from './onboarding.service';
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[mdbOnboardingAnchor]',
  exportAs: '',
})
export class MdbOnboardingDirective implements OnInit, OnDestroy {
  @Input() mdbOnboardingAnchor = '';

  readonly host = this._elementRef;
  readonly element = this.host.nativeElement;

  constructor(
    private _elementRef: ElementRef,
    private _mdbOnboardingService: MdbOnboardingService
  ) {}

  ngOnInit() {
    this._mdbOnboardingService.addAnchor(this);
  }

  ngOnDestroy() {
    this._mdbOnboardingService.removeAnchor(this);
  }
}
