import { Injectable } from "@angular/core";
import Pusher from 'pusher-js';

import { PusherChannelModel } from './pusher-channel.model';
import { PusherOptionsInterface } from './pusher-options.interface';
import { PusherChannelStatesEnum } from './pusher-channel-states.enum';

@Injectable({
	"providedIn": "root"
})
export class PusherService {
	//Client instance
	private client: Pusher;

	//Channels
	private channels: PusherChannelModel[];

	//Config
	private config: PusherOptionsInterface;

	//On creates
	constructor() {
		//Init arrays
		this.channels = [];
		this.config = {};
	}

	//Create client
	public createClient(config: PusherOptionsInterface) {
		//Check recreate client
		if (this.client) {
			return;
		}

		//Load config
		this.config = config;

		//Create client
		this.client = new Pusher(this.config.apiKey, {
			cluster: this.config.apiCluster
		});
	}

	//Bind event
	public bindEvent(channelName: string, eventName: string, clousure: Function): string {
		//Find channel
		let channel: PusherChannelModel = this.findChannel(channelName);

		//Check channel state
		if (channel.state != PusherChannelStatesEnum.CONNECTED) {
			channel.instance = this.client.subscribe(channelName);
		}

		return channel.addSubscriber(eventName, clousure);
	}

	//Unind event
	public unbindEvent(channelName: string, id: string) {
		//Find channel
		let channel: PusherChannelModel = this.findChannel(channelName);

		//Remove
		channel.removeSubscriber(id);

		//Check channel subscribers
		if (channel.subscribers.length === 0) {
			//Unsubscribe channel
			this.client.unsubscribe(channelName);

			//Set channel state
			channel.state = PusherChannelStatesEnum.DISCONNECTED;
		}
	}

	//Try to find channel
	private findChannel(channelName: string) {
		let channel: PusherChannelModel = this.channels.find(c => c.name === channelName);

		//Check not found channel, create it
		if (!(channel instanceof PusherChannelModel)) {
			channel = new PusherChannelModel(channelName);

			//Push
			this.channels.push(channel);
		}
		return channel;
	}

}