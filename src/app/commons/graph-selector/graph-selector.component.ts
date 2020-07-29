import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {LoadGraphsService} from '../../services/load-graphs.service';



@Component({
  selector: 'app-graph-selector',
  templateUrl: './graph-selector.component.html',
  styleUrls: ['./graph-selector.component.scss']
})
export class GraphSelectorComponent implements OnInit {
  graphsList$: Observable<string[]>;
  selectedGraph: string;

  @Input() hasToLoadGraph: Subject<string>;
  constructor(
    private fb: FormBuilder,
    private graphLoader: LoadGraphsService,
  ) { }

  ngOnInit() {
    this.graphsList$ = this.graphLoader.getAllGraphs();
  }

  loadGraph(selectedGraph: string) {
    this.hasToLoadGraph.next(selectedGraph);
  }
}
