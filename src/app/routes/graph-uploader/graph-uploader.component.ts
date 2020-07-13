import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective} from '@angular/forms';
import {LoadGraphsService} from '../../services/load-graphs.service';
import {FileInput} from 'ngx-material-file-input';

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

  handleSubmitContent() {
    const formData = new FormData();
    formData.append('graphName', this.formGroupContent.get('graphName').value);
    formData.append('graphContent', this.formGroupContent.get('graphContent').value);
    this.graphLoader.postGraph(formData)
      .subscribe(
        this.handleSuccess,
        this.handleError
      );
  }

  handleSubmitFile(value: any) {
    const formData = new FormData();
    formData.append('graphFile', this.formGroupFile.get('graphFile').value.files[0]);
    formData.append('graphName', this.formGroupFile.get('graphName').value);
    this.graphLoader.postGraph(formData)
      .subscribe(
        this.handleSuccess,
        this.handleError
      );
  }

  handleSuccess(data) {
    console.log('after posting data received', data);
  }

  handleError(err) {
    console.error(err);
  }
}
