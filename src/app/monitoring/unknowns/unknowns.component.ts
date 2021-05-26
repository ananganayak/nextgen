import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { MonitroingServiceService } from 'app/service/monitroing-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ms-unknowns',
  templateUrl: './unknowns.component.html',
  styleUrls: ['./unknowns.component.scss']
})
export class UnknownsComponent implements OnInit {

  constructor(    private pageTitleService: PageTitleService,
    private http: HttpClient,
    public monitorService: MonitroingServiceService,
    private modalService: NgbModal,
    private loadingBar: LoadingBarService,
    private toastr: ToastrService,
    config: NgbModalConfig,) { }

  ngOnInit(): void {
    this.pageTitleService.setTitle("Unknowns");
    this.getUnknownDatafn();
  }

  Unkowndata;

  //Get Unknown data function
  getUnknownDatafn():void {
    this.monitorService.getUnkownDataServ().subscribe(
      res => {
        console.log(res);
        if (res['result'] === 'success') {
          this.Unkowndata = res['data'];
          console.log(this.Unkowndata);
          this.toastr.success(res['result']);
        } else {
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
