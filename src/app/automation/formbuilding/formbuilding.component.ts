import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, NgZone, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ApiService } from 'app/service/api.service';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'ms-formbuilding',
  templateUrl: './formbuilding.component.html',
  styleUrls: ['./formbuilding.component.scss']
})
export class FormbuildingComponent implements AfterViewInit {
  formBuilder: any;
  formData;
  processId;
  InputVariable;
  OutputVariable;

  constructor(
    private ngZone: NgZone,
    // private pageTitleService: PageTitleService,
    private http: HttpClient,
    private apiService: ApiService,
    private modalService: NgbModal,
    private loadingBar: LoadingBarService,
    config: NgbModalConfig,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      this.processId = params['processId'];
      console.log(this.processId, ' processIdprocessId');
    });

    setTimeout(() => {
      this.getProcessVariables();

      setTimeout(() => {
        this.ngZone.runOutsideAngular(() => {


          const form_type = '';
          $('fb-editor').empty();
          const inputvar = {
            label: 'Input Variable',
            options: this.InputVariable
          };
          const outputvar = {
            label: 'Output Variable',
            options: 'outputobj'
          };
          const options = {
            disableFields: ['autocomplete', 'button', 'file', 'hidden', 'paragraph'],
            disabledAttrs: ['access'],
            controlOrder: ['header', 'text', 'number', 'date', 'textarea', 'select', 'checkbox-group', 'radio-group'],
            disabledActionButtons: ['clear', 'data', 'save'],
            typeUserAttrs: {
              'checkbox-group': {
                input_variable: inputvar,
                output_variable: outputvar
              },
              'date': {
                input_variable: inputvar,
                output_variable: outputvar
              },
              'header': {
                input_variable: inputvar,
                output_variable: outputvar
              },
              'number': {
                input_variable: inputvar,
                output_variable: outputvar
              },
              'radio-group': {
                input_variable: inputvar,
                output_variable: outputvar
              },
              'select': {
                input_variable: inputvar,
                output_variable: outputvar
              },
              'text': {
                input_variable: inputvar,
                output_variable: outputvar
              },
              'textarea': {
                input_variable: inputvar,
                output_variable: outputvar
              }
            }
          };
          this.formBuilder = $(document.getElementById('fb-editor')).formBuilder(options);

          $('#fb-editor').on('click', '.fld-input_variable', function () {
            if ($(this).val() == 'output') {
              const outPutVariable = $('#fb-editor').find('.fld-output_variable')[0].id
              const outPutVariableID = document.getElementById(outPutVariable);
              outPutVariableID.setAttribute('disabled', 'disabled');
              outPutVariableID.setAttribute('placeholder', 'Output variable disabled');
            } else {
              const outPutVariable = $('#fb-editor').find('.fld-output_variable')[0].id
              const outPutVariableID = document.getElementById(outPutVariable);
              outPutVariableID.removeAttribute('disabled');
              outPutVariableID.setAttribute('placeholder', '');
            }
          });

        });
      }, 1000);

    }, 2000);
  }


  getProcessVariables() {
    this.apiService
      .ProcessVariablesApi(this.processId)
      .subscribe(
        (data: any) => {

          this.InputVariable = Object.keys(data.response.ProcessVariables);
          console.log(this.InputVariable, ' getProcessVariables')

        },
        (err: HttpErrorResponse) => {
          console.log(err, ' getProcessVariables Error');
        }
      );
  }


  sendingFormcontent() {
    this.formData = this.formBuilder.formData;

    console.log(this.formData, ' sendingFormcontent');


    // this.apiService
    //   .formcontentApi(this.processId, this.formData)
    //   .subscribe(
    //     (data: any) => {
    //       console.log(data, ' sendingFormcontent');
    //       this.goBack();
    //     },
    //     (err: HttpErrorResponse) => {
    //       console.log(err, ' sendingFormcontent Error');
    //     }
    //   );
  }

  goBack() {
    const url = '/automation/designer';
    this.router.navigate([url]);
  }

}
