import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTimelineComponent } from './dialog-timeline.component';

describe('DialogComponent', () => {
    let component: DialogTimelineComponent;
    let fixture: ComponentFixture<DialogTimelineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DialogTimelineComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogTimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
