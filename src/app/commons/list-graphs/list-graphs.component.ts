import {Component, Input, OnInit} from '@angular/core';
import {LoadGraphsService} from '../../services/load-graphs.service';
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.refreshData();
    if (this.hasToRefresh !== undefined) {
      this.hasToRefresh.subscribe((_) => {
        this.refreshData();
      })
    }
    // console.log('Display remove button', this.hasDelete);
  }

  private displaySnackBar(message: string) {
    this.snackBar.open(message, 'dismiss', {
      duration: 2000,
    });
  }

  private refreshData() {
    this.graphsList$ = this.graphLoader.getAllGraphs();
  }
  // TODO :: implement this method
  deleteGraph(graphName: string) {
    this.graphLoader.deleteGraph({graph_name: graphName}).subscribe(
      (data) => {
        this.refreshData();
        this.displaySnackBar('Graph deleted successfully')
      },
      (err) => {
        this.displaySnackBar('Unable to delete Graph (in console)');
        console.log(err);
      }
    );
  }

}
