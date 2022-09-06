import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SocketService } from './socket.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

//const config: SocketIoConfig = { url: 'http://localhost:4200/api', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //SocketIoModule.forRoot(config)
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

