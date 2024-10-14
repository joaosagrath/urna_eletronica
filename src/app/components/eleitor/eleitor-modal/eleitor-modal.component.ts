import { Component, Input } from '@angular/core';
import { Eleitor } from '../../../models/eleitor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EleitorFormComponent } from '../eleitor-form/eleitor-form.component';

@Component({
  selector: 'app-eleitor-modal',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, EleitorFormComponent],
  templateUrl: './eleitor-modal.component.html',
  styleUrls: ['./eleitor-modal.component.scss'],
})

export class EleitorModalComponent {

  constructor(public activeModal: NgbActiveModal) {}

  fechar(): void {
    this.activeModal.dismiss('fechar');
  }

}