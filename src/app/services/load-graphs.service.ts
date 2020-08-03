import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import NodeDescriptor from '../model/NodeDescriptor';
import EdgeDescriptor from '../model/EdgeDescriptor';
import GraphDescriptor from '../model/GraphDescriptor';

@Injectable({
  providedIn: 'root'
})
export class LoadGraphsService {

  private baseURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  public getGraph(graphName: string): Observable<GraphDescriptor> {
    console.log('trying to load graph', graphName);
    return this.http.get<GraphDescriptor>(`${this.baseURL}/graph`);
  }

  public postGraph(body: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/graph`, body);
  }

  public deleteGraph(body: {graph_name: string}): Observable<any> {
    console.log(body)
    return this.http.request('delete',`${this.baseURL}/graph`, {
        body
      }
    );
  }

  public getAllGraphs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseURL}/graphs`);
  }
}
