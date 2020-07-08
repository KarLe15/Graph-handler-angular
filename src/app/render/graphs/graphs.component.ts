import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatAccordion} from '@angular/material';
import * as go from 'gojs';
import {DataSyncService} from 'gojs-angular';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphsComponent implements OnInit {
  @ViewChild(MatAccordion, {static: true}) accordion: MatAccordion;
  // GoJS data
  public diagramNodeData: Array<go.ObjectData> = [
    { key: 'Alpha', color: 'lightblue', arr: [1, 2] },
    { key: 'Beta', color: 'orange' },
    { key: 'Gamma', color: 'lightgreen' },
    { key: 'Delta', color: 'pink' }
  ];
  public diagramLinkData: Array<go.ObjectData> = [
    { key: -1, from: 'Alpha', to: 'Beta', fromPort: 'r', toPort: '1' },
    { key: -2, from: 'Alpha', to: 'Gamma', fromPort: 'b', toPort: 't' },
    { key: -3, from: 'Beta', to: 'Beta' },
    { key: -4, from: 'Gamma', to: 'Delta', fromPort: 'r', toPort: 'l' },
    { key: -5, from: 'Delta', to: 'Alpha', fromPort: 't', toPort: 'r' }
  ];
  public diagramDivClassName = 'myDiagramDiv';
  public diagramModelData = { prop: 'value' };
  public skipsDiagramUpdate = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
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


    const makePort = (id: string, spot: go.Spot) => {
      return $(go.Shape, 'Circle',
        {
          opacity: .5,
          fill: 'gray', strokeWidth: 0, desiredSize: new go.Size(8, 8),
          portId: id, alignment: spot,
          fromLinkable: true, toLinkable: true
        }
      );
    };

    // define the Node template
    dia.nodeTemplate =
      $(go.Node, 'Spot',
        {
          contextMenu:
            $('ContextMenu',
              $('ContextMenuButton',
                $(go.TextBlock, 'Group'),
                { click: (e, obj) => { e.diagram.commandHandler.groupSelection(); } },
                new go.Binding('visible', '', (o) => o.diagram.selection.count > 1).ofObject()
              )
            )
        },
        $(go.Panel, 'Auto',
          $(go.Shape, 'RoundedRectangle', { stroke: null },
            new go.Binding('fill', 'color')
          ),
          $(go.TextBlock, { margin: 8 },
            new go.Binding('text', 'key')
          )
        ),
        // Ports
        makePort('t', go.Spot.TopCenter),
        makePort('l', go.Spot.Left),
        makePort('r', go.Spot.Right),
        makePort('b', go.Spot.BottomCenter)
      );

    return dia;
  }
  // When the diagram model changes, update app data to reflect those changes
  public diagramModelChange = (changes: go.IncrementalData) => {
    // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Diagram's undoManager history
    // this.skipsDiagramUpdate = true;
    //
    // this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    // this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    // this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
  }

}
