export class PusherSubscriberModel {
	public id: string;

	constructor(
		public event?: string,
		public clousure?: Function,
		public instance?: any) {
		// Radom id
		this.id = Math.random().toString(36).substring(2, 12);
	}
}