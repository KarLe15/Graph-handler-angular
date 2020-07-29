import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective} from '@angular/forms';
import { LoadGraphsService } from '../../services/load-graphs.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subject} from "rxjs";


@Component({
  selector: 'app-graph-uploader',
  templateUrl: './graph-uploader.component.html',
  styleUrls: ['./graph-uploader.component.scss']
})
export class GraphUploaderComponent implements OnInit {
  formGroupContent: FormGroup;
  formGroupFile: FormGroup;
  subjectRefreshData: Subject<void>;

  constructor(
    private fb: FormBuilder,
    private graphLoader: LoadGraphsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.subjectRefreshData = new Subject<void>();
    this.formGroupContent = this.fb.group({
      graphName: '',
      graphContent: '',
    });
    this.formGroupFile = this.fb.group({
      graphName: '',
      graphFile: ''
    });
  }
  // TODO :: this method should r
  handleSubmitContent(contentFormDirective: FormGroupDirective) {
    if (!this.formGroupContent.valid) {
      return;
    }
    const formData = new FormData();
    formData.append('graphName', this.formGroupContent.get('graphName').value);
    formData.append('graphContent', this.formGroupContent.get('graphContent').value);
    this.graphLoader.postGraph(formData)
      .subscribe(
        (data) => this.handleSuccess(data, contentFormDirective),
        this.handleError.bind(this)
      );
  }

  handleSubmitFile(fileFormDirective: FormGroupDirective) {
    if (!this.formGroupFile.valid) {
      return;
    }
    const formData = new FormData();
    formData.append('graphFile', this.formGroupFile.get('graphFile').value.files[0]);
    formData.append('graphName', this.formGroupFile.get('graphName').value);
    this.graphLoader.postGraph(formData)
      .subscribe(
        // this.handleSuccess.bind(this),
        (data) => this.handleSuccess(data, fileFormDirective),
        this.handleError.bind(this)
      );
  }


  handleSuccess(data, formDirective: FormGroupDirective) {
    // console.log('after posting data received', data);
    this.resetFroms(formDirective);
    this.displaySuccessSnackBar();
    this.refreshData();
  }

  private displaySuccessSnackBar() {
    this.snackBar.open('Graph uploaded successfully', 'dismiss', {
      duration: 2000,
    });
  }

  handleError(err) {
    this.snackBar.open('Could not upload graph', 'dismiss', {
      duration: 2000,
    });
    console.error(err);
  }

  private refreshData() {
    this.subjectRefreshData.next();
  }

  private resetFroms(formDirective: FormGroupDirective) {
    formDirective.reset();
    this.formGroupFile.reset();
    this.formGroupContent.reset();
  }
}
