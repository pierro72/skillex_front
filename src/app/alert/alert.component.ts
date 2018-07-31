import { Component } from '@angular/core';
import { Alert, AlertType,AlertService } from './';
import { Observable } from 'rxjs/Observable';
import { TIMEOUT_DEFAUT, TIMEOUT_SUCCES, TIMEOUT_ERRORS, TIMEOUT_WARNING} from '../app.constants'

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.css'],
})

export class AlertComponent {
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getAlert().subscribe(
            (alert: Alert) => {
                if (!alert) {
                    this.alerts = [];
                    return;
                }
                this.alerts.push(alert);
                if (alert.type == AlertType.Info) {
                    Observable.timer(TIMEOUT_DEFAUT).subscribe(i => {  this.removeAlert(alert)  })
                }
                if (alert.type == AlertType.Success) {
                    Observable.timer(TIMEOUT_SUCCES).subscribe(i => {  this.removeAlert(alert)  })
                }
                if (alert.type == AlertType.Warning) {
                    Observable.timer(TIMEOUT_WARNING).subscribe(i => {  this.removeAlert(alert)  })
                }
                if (alert.type == AlertType.Error) {
                    Observable.timer(TIMEOUT_ERRORS).subscribe(i => {  this.removeAlert(alert)  })
                }
            }
        );
    }



    removeAlert(alert: Alert) {
        setTimeout(console.log('timeout'),TIMEOUT_DEFAUT);
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    clean(){
        this.alerts = [];
    }

    cssClass(alert: Alert) {
        if (!alert) { return; }
        switch (alert.type) {
            case AlertType.Success:
                return 'callout callout-success';
            case AlertType.Error:
                return 'callout callout-danger';
            case AlertType.Info:
                return 'callout callout-info';
            case AlertType.Warning:
                return 'callout callout-warning';
        }
    }

}
