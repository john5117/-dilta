import { Component, OnInit } from '@angular/core';
import { animations } from '../animations';

@Component({
  selector: 'app-setup-done',
  animations: animations,
  templateUrl: './setup-done.component.html',
  styleUrls: ['./setup-done.component.scss']
})
export class SetupDoneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
