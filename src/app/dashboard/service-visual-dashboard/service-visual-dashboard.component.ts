import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';

@Component({
  selector: 'ms-service-visual-dashboard',
  templateUrl: './service-visual-dashboard.component.html',
  styleUrls: ['./service-visual-dashboard.component.scss']
})
export class ServiceVisualDashboardComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) { }

  ngOnInit() {
      this.pageTitleService.setTitle("Service Visual Dashboard");
  }

}
