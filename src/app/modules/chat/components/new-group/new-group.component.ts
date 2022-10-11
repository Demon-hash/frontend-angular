import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewGroupDialogComponent } from "~/src/app/modules/chat/components/new-group-dialog/new-group-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component( {
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: [ './new-group.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class NewGroupComponent {

  constructor( private readonly dialog: MatDialog ) {
  }

  create() {
    this.dialog.open( NewGroupDialogComponent );
  }
}
