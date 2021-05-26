import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';

@Component({
  selector: 'ms-auto-classfication-dashboard',
  templateUrl: './auto-classfication-dashboard.component.html',
  styleUrls: ['./auto-classfication-dashboard.component.scss']
})
export class AutoClassficationDashboardComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit() {
      this.pageTitleService.setTitle("Auto Classification Dashboard");
  }

}
