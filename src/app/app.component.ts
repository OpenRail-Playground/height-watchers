import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreventedIncidentsComponent } from './prevented-incidents/prevented-incidents.component';
import { CurrentBridgeLocationComponent } from './current-bridge-location/current-bridge-location.component';
import { SignalComponent } from './current-sensor-data/signal.component';
import { ProcessFlowComponent } from './process-flow/process-flow.component';
import { VehicleGeneratorComponent } from './vehicle-generator/vehicle-generator.component';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PreventedIncidentsComponent, CurrentBridgeLocationComponent, SignalComponent, ProcessFlowComponent, VehicleGeneratorComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'heightwatchers';

  public bridgeCrashHappened: boolean = false;
  public bridgeCrashPreventedHappened: boolean = false;

  bridgeCrash(event: boolean): void {
    this.bridgeCrashHappened = true;
  }

  bridgeCrashPrevented(event: boolean): void {
    this.bridgeCrashPreventedHappened = true;
  }
}
