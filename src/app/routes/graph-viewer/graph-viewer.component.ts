import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import * as go from 'gojs';
import {DataSyncService} from 'gojs-angular';
import {LoadGraphsService} from '../../services/load-graphs.service';
import {MatAccordion} from '@angular/material/expansion';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-graphs',
  templateUrl: './graph-viewer.component.html',
  styleUrls: ['./graph-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphViewerComponent implements OnInit {
  hasToLoadGraphSubject: Subject<string>;
  currentGraph: string;

  @ViewChild(MatAccordion, {static: true}) accordion: MatAccordion;
  // GoJS data
  public diagramNodeData: Array<go.ObjectData> = [];
  public diagramLinkData: Array<go.ObjectData> = [];
  public diagramModelData: go.ObjectData = { prop: 'value' };
  public diagramDivClassName = 'myDiagramDiv';
  public skipsDiagramUpdate = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private graphLoader: LoadGraphsService,
  ) { }


  // TODO :: factorize all Observables to unsubscribe at the end
  ngOnInit() {
    this.hasToLoadGraphSubject = new Subject<string>();
    this.hasToLoadGraphSubject.asObservable().subscribe((graphName) => {
      this.loadGraph(graphName);
    })
    // TODO :: must always have a default graph
    this.loadGraph('default');
  }
  // GoJS code
  // initialisation
  public initDiagram(): go.Diagram {

    const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true,
      model: $(go.GraphLinksModel,
        {
          // linkToPortIdProperty: 'toPort',
          // linkFromPortIdProperty: 'fromPort',
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };


    // define the Node template
    dia.nodeTemplate =
      $(go.Node, 'Spot',
        $(go.Panel, 'Auto',
          $(go.Shape, 'circle', { stroke: null },
            new go.Binding('fill', 'color')
          ),
          $(go.TextBlock, { margin: 8 },
            new go.Binding('text', 'key')
          )
        )
      );

    dia.linkTemplate =
      $(go.Link,
        $(go.Shape),                           // this is the link shape (the line)
        $(go.Shape, { toArrow: 'Standard' }),
        $(go.TextBlock,
          new go.Binding('text', 'label')
        )
      );

    return dia;
  }
  // When the diagram model changes, update app data to reflect those changes
  public diagramModelChange = (changes: go.IncrementalData) => {
    // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Diagram's undoManager history
    this.skipsDiagramUpdate = true;
    //
    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
  }

  private loadGraph(graphName: string) {
    this.currentGraph = graphName;
    this.graphLoader.getGraph(graphName).subscribe((graph) => {
      this.diagramNodeData = graph.nodes;
      this.diagramLinkData = graph.edges;
    });
  }
}
