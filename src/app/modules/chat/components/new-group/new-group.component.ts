import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NewGroupDialogComponent } from "~/src/app/modules/shared/components/new-group-dialog/new-group-dialog.component";
import { take } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

@Component( {
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: [ './new-group.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class NewGroupComponent implements OnInit {

  constructor(
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  create() {
    const dialogRef = this.dialog.open( NewGroupDialogComponent );
    dialogRef
      .afterClosed()
      .pipe( take( 1 ) )
      .subscribe( result => {

      } );
  }
}
