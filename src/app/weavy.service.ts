import { Injectable, OnDestroy } from '@angular/core';

// The Weavy class must be declared for usage
declare let Weavy : any;

@Injectable({
  providedIn: 'root'
})
export class WeavyService implements OnDestroy {

  initialized: boolean = false;

  jwt: any; // String, function or promise
  weavy: any; // The weavy instance

  constructor() {
    // This JWT token only works for demos using showcase.weavycloud.com as weavy server.
    // Replace the token with your own when using  your own server.
    this.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNjA1MDM1MTY2LCJleHAiOjE2MzY1NzExNzYsInN1YiI6IlRlc3QyIiwiY2xpZW50X2lkIjoiY2xpZW50aWQiLCJ1c2VybmFtZSI6IlRlc3QyIiwiZW1haWwiOiJ0ZXN0MkBlbWFpbC5jb20iLCJkaXIiOiJ3ZWF2eSJ9.1GZLZS0KEXyXGLZM1EOEgYIZYu2Gf2doyPY0trha_eI';
    this.weavy = new Weavy({ jwt: this.jwt, init: false });
  }

  init(): void {
    if (!this.initialized && !this.weavy.isInitialized) {
      this.weavy.init();
    }
    this.initialized = true;
  }

  space(selector: any): any {
    this.init();
    return this.weavy.space(selector);
  }

  ngOnDestroy(): void {
    this.weavy.destroy();
  }
}
