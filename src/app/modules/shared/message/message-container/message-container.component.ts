import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {Message} from '../message';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: Message) {
  }

  ngOnInit() {
  }

}
