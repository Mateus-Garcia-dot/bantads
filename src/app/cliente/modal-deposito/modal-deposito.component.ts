import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-deposito',
  templateUrl: './modal-deposito.component.html',
  styleUrls: ['./modal-deposito.component.scss'],
})
export class ModalDepositoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ModalDepositoComponent>) {}

  ngOnInit(): void {
    return;
  }

  actionFunction() {
    alert('You have logged out.');
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }
}
