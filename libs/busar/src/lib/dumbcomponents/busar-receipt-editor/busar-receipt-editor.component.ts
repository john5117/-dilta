import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BusarReceiptFormBase } from '@dilta/busar-base';

@Component({
  selector: 'busar-receipt-form',
  templateUrl: './busar-receipt-editor.component.html',
  styleUrls: ['./busar-reciept-editor.component.scss']
})
export class BusarReceiptFormComponent extends BusarReceiptFormBase {
  constructor(fb: FormBuilder) {
    super(fb);
  }
}
