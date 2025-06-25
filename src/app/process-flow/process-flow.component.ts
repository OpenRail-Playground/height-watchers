import {Component, Input, OnChanges} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-process-flow',
    standalone: true,
    imports: [
        NgIf
    ],
    templateUrl: './process-flow.component.html',
    styleUrl: './process-flow.component.scss'
})
export class ProcessFlowComponent implements OnChanges {
    detectedOversize: boolean = false;
    trafficHalted: boolean = false;
    policeInformed: boolean = false;
    policePresent: boolean = false;
    policeReroute: boolean = false;
    policeMeasures: boolean = false;
    emergencyManagerInformed: boolean = false;
    emergencyManagerPresent: boolean = false;
    alarmReleased: boolean = false;

    @Input()
    vehicleCrashWithBridge: boolean = false;

    @Input()
    vehicleCrashWithBridgePrevented: boolean = false;

    ngOnChanges(): void {
        if (this.vehicleCrashWithBridgePrevented) {
            this.detectedOversize = true;
            this.trafficHalted = true;
            this.policeInformed = true;
            this.policePresent = true;
            this.policeReroute = true;
        }

        if (this.vehicleCrashWithBridge) {
            this.detectedOversize = true;
            this.trafficHalted = true;
            this.policeInformed = true;
            this.policePresent = true;
            this.policeMeasures = true;
            this.emergencyManagerInformed = true;
            this.emergencyManagerPresent = true;
            this.alarmReleased = true;
        }
    }
}
