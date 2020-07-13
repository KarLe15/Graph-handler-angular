import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadGraphsService } from '../../services/load-graphs.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-graph-uploader',
  templateUrl: './graph-uploader.component.html',
  styleUrls: ['./graph-uploader.component.scss']
})
export class GraphUploaderComponent implements OnInit {
  formGroupContent: FormGroup;
  formGroupFile: FormGroup;
  constructor(
    private fb: FormBuilder,
    private graphLoader: LoadGraphsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
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
  handleSubmitContent() {
    if (!this.formGroupContent.valid) {
      return;
    }
    const formData = new FormData();
    formData.append('graphName', this.formGroupContent.get('graphName').value);
    formData.append('graphContent', this.formGroupContent.get('graphContent').value);
    this.graphLoader.postGraph(formData)
      .subscribe(
        (data) => this.handleSuccess(data),
        (err) => this.handleError(err)
      );
  }

  handleSubmitFile(value: any) {
    if (!this.formGroupFile.valid) {
      return;
    }
    const formData = new FormData();
    formData.append('graphFile', this.formGroupFile.get('graphFile').value.files[0]);
    formData.append('graphName', this.formGroupFile.get('graphName').value);
    this.graphLoader.postGraph(formData)
      .subscribe(
        (data) => this.handleSuccess(data),
        (err) => this.handleError(err)
      );
  }

  // TODO :: this method should clear forms and refresh data in the display
  handleSuccess(data) {
    console.log('after posting data received', data);
    this.displaySuccessSnackBar();
  }

  private displaySuccessSnackBar() {
    this.snackBar.open('Graph uploaded successfully', 'dismiss', {
      duration: 2000,
    });
  }

  handleError(err) {
    console.error(err);
  }
}
