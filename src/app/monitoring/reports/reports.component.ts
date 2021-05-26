import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';

@Component({
  selector: 'ms-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit(): void {
    this.pageTitleService.setTitle("Reports")
  }

}
