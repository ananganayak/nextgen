import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service'

@Component({
  selector: 'ms-drop-events',
  templateUrl: './drop-events.component.html',
  styleUrls: ['./drop-events.component.scss']
})
export class DropEventsComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit(): void {
    this.pageTitleService.setTitle("Drop Events")
  }

}
