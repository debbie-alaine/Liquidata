import { MatDialogRef } from '@angular/material/dialog';
import {Component} from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

    confirm() {
        this.dialogRef.close();
    }

}
