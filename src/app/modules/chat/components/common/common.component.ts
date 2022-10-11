import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

@Component( {
  selector: 'app-chat-common',
  templateUrl: './common.component.html',
  styleUrls: [ './common.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class CommonComponent implements OnDestroy {
  constructor() {
  }

  ngOnDestroy(): void {
  }
}
