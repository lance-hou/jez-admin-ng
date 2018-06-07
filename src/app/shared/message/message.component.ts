import {Component, Inject, OnInit} from '@angular/core';
import {Message} from './message';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'srd-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: Message) {
  }

  ngOnInit() {
  }

}
