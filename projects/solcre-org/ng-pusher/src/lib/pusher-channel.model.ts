import { PusherChannelStatesEnum } from './pusher-channel-states.enum';
import { PusherSubscriberModel } from './pusher-subscriber.model';

export class PusherChannelModel {
	public state: PusherChannelStatesEnum;
	public subscribers: PusherSubscriberModel[];

	constructor(
		public name?: string,
		public instance?: any) {
		//Default state
		this.state = PusherChannelStatesEnum.DISCONNECTED;
		this.subscribers = [];
	}

	public addSubscriber(eventName: string, clousure: Function): string {
		//Check instance before bind
		if (this.instance) {
			//Create 
			let subscriber: PusherSubscriberModel = new PusherSubscriberModel(eventName,
				clousure,
				//Bind event
				this.instance.bind(eventName, clousure)
			);

			//Add to collection
			this.subscribers.push(subscriber);

			//Return subscriber id
			return subscriber.id;
		}
	}

	public removeSubscriber(id: string) {
		//Get all ids
		const ids: string[] = this.subscribers.map(s => s.id);
		const index: number = ids.indexOf(id);

		//Check index
		if (index > -1) {
			//Unsubscribe from pusher
			this.instance.unbind(
				this.subscribers[index].event,
				this.subscribers[index].clousure
			);

			//Remove from array
			this.subscribers.splice(index, 1);
		}
	}
}