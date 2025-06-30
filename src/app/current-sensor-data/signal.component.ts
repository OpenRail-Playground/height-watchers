import {Component, OnInit, OnDestroy, Input, OnChanges} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-current-sensor-data',
    imports: [CommonModule],
    templateUrl: './signal.component.html',
    styleUrl: './signal.component.scss'
})
export class SignalComponent implements OnInit, OnChanges {
  trafficLightState: 'red' | 'yellow' | 'green' = 'green';

  @Input()
  vehicleCrashWithBridge: boolean = false;

  @Input()
  vehicleCrashWithBridgePrevented: boolean = false;

  protected incidentCounter: number = 541;

  ngOnChanges(): void {
    this.updateTrafficLightState();
  }

  ngOnInit(): void {
   this.updateTrafficLightState();
  }

  updateTrafficLightState(): void {
    if(this.vehicleCrashWithBridge) {
      this.trafficLightState = 'red';
      this.incidentCounter++;
    }

    if(this.vehicleCrashWithBridgePrevented) {
      this.trafficLightState = 'yellow';
    }
  }
}
