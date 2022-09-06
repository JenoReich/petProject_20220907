import { AfterViewInit, Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { SocketService } from '../socket.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  public map!: Map
  
  constructor(private socketService:SocketService){}
  ngOnInit(): void {
    this.socketService.getPosition().subscribe(position=>console.log(position));
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2, maxZoom: 18,
      }),
    });
  }

  ngAfterViewInit(): void {
      //
      //this.map.getView().setCenter([48.21566057,20.73967246])
      this.map.getView().setCenter([10.21566057,60.73967246])
      this.map.getView().setZoom(5);
  }
  
}
