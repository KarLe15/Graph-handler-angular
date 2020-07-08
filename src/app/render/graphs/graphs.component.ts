import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatAccordion} from '@angular/material';
import * as go from 'gojs';
import {DataSyncService} from 'gojs-angular';
import {LoadGraphsService} from '../../services/load-graphs.service';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphsComponent implements OnInit {
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

  ngOnInit() {
    this.graphLoader.getGraph().subscribe((graph) => {
      this.diagramNodeData = graph.nodes;
      this.diagramLinkData = graph.edges;
    });
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

}
