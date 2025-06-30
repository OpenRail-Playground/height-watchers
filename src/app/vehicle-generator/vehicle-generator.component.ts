import {afterNextRender, afterRender, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-vehicle-generator',
    imports: [
        DecimalPipe
    ],
    templateUrl: './vehicle-generator.component.html',
    styleUrl: './vehicle-generator.component.scss'
})
export class VehicleGeneratorComponent implements OnInit, OnDestroy {
  protected accelerationMeterPerSecond: number = 0.0;
  protected velocityKmH: number = 0.0;
  protected velocityKmHMax: number = 0.0
  protected distanceToBridgeInMeters: number=0.0;
  protected timePassedInSeconds: number = 0.0;
  protected vehicleActive: boolean = true;
  protected startTime: number = 0.0;
  protected bridgeHeight: number = 2.0;
  protected vehicleHeight: number = 0.0;

  @Output()
  vehicleCrashedWithBridgeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  vehicleCrashedWithBridgePreventedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  vehicleCrashedWithBridge: boolean = false;
  vehicleCrashedWithBridgePrevented: boolean = false;

  protected refreshInterval: any;

  public constructor() {
    this.accelerationMeterPerSecond = Math.random() * 10;
    this.velocityKmH = 0.0;
    this.velocityKmHMax = Math.random() * 100 + 50;
    this.distanceToBridgeInMeters = Math.random() * 100 + 400;
    this.timePassedInSeconds = 0.0;
    this.vehicleActive = true;
    this.vehicleHeight = Math.random() * 2.5 + 0.4;

    this.vehicleCrashedWithBridge = false;
    this.vehicleCrashedWithBridgePrevented = false;

    this.startTime = Date.now();

    afterRender(() => {
      this.afterRender();
    });
  }

  ngOnInit(): void {
    // Refresh every 500ms (half a second)
    this.refreshInterval = setInterval(() => {
      this.updateVehicleData();
    }, 500);
  }

  ngOnDestroy(): void {
    // Clean up the interval when component is destroyed
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  private updateVehicleData(): void {
    this.timePassedInSeconds = (Date.now() - this.startTime) / 1000;

    // Update velocity based on acceleration and time
    if (this.vehicleActive) {
      this.velocityKmH += this.accelerationMeterPerSecond * 3.6 * 0.5; // Convert m/s² to km/h/s and multiply by 0.5s

      // Cap velocity at max
      if (this.velocityKmH > this.velocityKmHMax) {
        this.velocityKmH = this.velocityKmHMax;
      }

      // Update distance to bridge
      const distanceTraveledInHalfSecond = (this.velocityKmH / 3.6) * 0.5; // Convert km/h to m/s and multiply by 0.5s
      this.distanceToBridgeInMeters -= distanceTraveledInHalfSecond;

      // If vehicle has reached the bridge
      if (this.distanceToBridgeInMeters <= 0.0) {
        if(this.vehicleHeight >= this.bridgeHeight) {
          // 50 / 50 Chance for crash or crash prevented
          if (Math.random() < 0.5) {
            this.vehicleCrashedWithBridge = true;
            this.vehicleCrashedWithBridgePrevented = false;
            this.vehicleCrashedWithBridgeEvent.emit(true);
          } else {
            this.vehicleCrashedWithBridge = false;
            this.vehicleCrashedWithBridgePrevented = true;
            this.vehicleCrashedWithBridgePreventedEvent.emit(true);
          }

          clearInterval(this.refreshInterval);
        }

        this.distanceToBridgeInMeters = 0;
      }
    }
  }

  public afterRender(): void {
    this.timePassedInSeconds = (Date.now() - this.startTime) / 1000;
  }
}
