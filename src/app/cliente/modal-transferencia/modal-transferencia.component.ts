import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-transferencia',
  templateUrl: './modal-transferencia.component.html',
  styleUrls: ['./modal-transferencia.component.scss'],
})
export class ModalTransferenciaComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ModalTransferenciaComponent>) {}

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
