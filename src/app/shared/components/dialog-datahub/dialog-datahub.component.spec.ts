import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {DialogDatahubComponent} from './dialog-datahub.component';

describe('DialogComponent', () => {
    let component: DialogDatahubComponent;
    let fixture: ComponentFixture<DialogDatahubComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DialogDatahubComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogDatahubComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
