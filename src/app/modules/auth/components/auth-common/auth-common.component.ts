import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-common',
  templateUrl: './auth-common.component.html',
  styleUrls: ['./auth-common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthCommonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
