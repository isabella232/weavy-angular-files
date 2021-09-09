import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WeavyService } from '../weavy.service';

@Component({
  selector: 'app-weavy',
  template: '<div #weavyContainer class="weavy-container"></div>',
  styles: ['.weavy-container { display: contents; }']
  
})

export class WeavyComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() spaceKey: string = "angular-global";
  @Input() spaceName: string = "Angular Global Space";
  @Input() appType: string = "messenger";
  @Input() appKey: string = "angular-chat";
  @Input() appName: string = "Angular Chat";

  @ViewChild('weavyContainer') weavyContainer!: ElementRef;

  weavySpace: any;
  weavyApp: any;

  constructor(private weavy : WeavyService) { }
  ngOnInit(): void {
    this.weavySpace = this.weavy.space({
      key: this.spaceKey,
      name: this.spaceName,
    })
  }

  // The weavyContainer is not available until the view has been initialized
  ngAfterViewInit(): void {
    // After the view is initialized and the weavyContainer is available
    this.weavyApp = this.weavySpace.app({
      type: this.appType,
      key: this.appKey,
      name: this.appName,
      container: this.weavyContainer!.nativeElement
    });
  }
  ngOnDestroy(): void {
    this.weavyApp!.remove();
  }
}
