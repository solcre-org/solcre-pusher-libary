# NgPusher
Solcre library to package all the functionalities of PusherJS.

## Init
Import in module.ts the NgPusher module.
``` js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgPusherModule } from '@solcre-org/ng-pusher';

@NgModule({
  declarations: [AppComponent],
  imports: [
	BrowserModule,
	NgPusherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Put this code in app_initializer or before pusherjs code

``` js
...
this.pusherService.createClient({
	apiKey: '', // Put your apiKey
	apiCluster: '' //Put your api cluster name
});
...
```

In the code:
``` js
const channelName: string = 'CHANNEL-NAME'; // In users case meaybe put @ID in the ends

//Pusher bind
this.pusherSubscriber = this.pusherService.bindEvent(channelName, 'CHANNEL-EVENT-NAME', (data: any) => {
	// This code is called from the server
});
```

``` js
//IMPORTANT: Pusher unbind (on component destroy)
if(this.pusherSubscriber){
	const channelName: string = 'CHANNEL-NAME'; 

	//Pusher unbind
	this.pusherService.unbindEvent(channelName, this.pusherSubscriber);
}
```
