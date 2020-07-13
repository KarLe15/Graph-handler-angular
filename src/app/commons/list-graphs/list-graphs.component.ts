import { Component, OnInit } from '@angular/core';
import {LoadGraphsService} from '../../services/load-graphs.service';

@Component({
  selector: 'app-list-graphs',
  templateUrl: './list-graphs.component.html',
  styleUrls: ['./list-graphs.component.scss']
})
export class ListGraphsComponent implements OnInit {

  public graphsList$;
  constructor(
    private graphLoader: LoadGraphsService,
  ) { }

  ngOnInit() {
    this.graphsList$ = this.graphLoader.getAllGraphs();
  }

}
