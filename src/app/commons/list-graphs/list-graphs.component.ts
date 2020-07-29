import {Component, Input, OnInit} from '@angular/core';
import {LoadGraphsService} from '../../services/load-graphs.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-graphs',
  templateUrl: './list-graphs.component.html',
  styleUrls: ['./list-graphs.component.scss']
})
export class ListGraphsComponent implements OnInit {
  @Input() hasDelete: boolean;
  @Input() hasToRefresh: Observable<void>;

  public graphsList$: Observable<string[]>;
  constructor(
    private graphLoader: LoadGraphsService,
  ) { }

  ngOnInit() {
    this.refreshData();
    if (this.hasToRefresh !== undefined) {
      this.hasToRefresh.subscribe((_) => {
        this.refreshData();
      })
    }
    console.log('Display remove button', this.hasDelete);
  }

  private refreshData() {
    this.graphsList$ = this.graphLoader.getAllGraphs();
  }
  // TODO :: implement this method
  deleteGraph(graphName: string) {
    console.log('graph name', graphName);
    // this.refreshData();
  }

}
