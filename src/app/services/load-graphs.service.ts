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
  // TODO :: delete this method
  public getNodes(): Observable<NodeDescriptor[]> {
    console.log('trying to load nodes');
    return this.http.get<NodeDescriptor[]>(`${this.baseURL}/nodes`);
  }
  // TODO :: delete this method
  public getEdges(): Observable<EdgeDescriptor[]> {
    console.log('trying to load edges');
    return this.http.get<EdgeDescriptor[]>(`${this.baseURL}/edges`);
  }

  public getGraph(): Observable<GraphDescriptor> {
    console.log('trying to load graph');
    return this.http.get<GraphDescriptor>(`${this.baseURL}/graph`);
  }

  public postGraph(body: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/graph`, body);
  }

  public getAllGraphs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseURL}/graphs`);
  }
}
