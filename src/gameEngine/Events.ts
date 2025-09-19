import type { GameObject } from "./GameObject";

interface Subscription {
  id: number,
  eventName: string,
  caller: GameObject,
  callback: { (value: object | null): void }
}

class Events {
  nextId: number = 0;
  subscriptions: Subscription[] = [];

  on(eventName: string, caller: GameObject, callback: { (value: object | null): void }) {
    this.nextId += 1;
    this.subscriptions.push({
      id: this.nextId,
      eventName,
      caller,
      callback
    });

    return this.nextId;
  }

  off(id: number) {
    this.subscriptions = this.subscriptions.filter((sub) => sub.id !== id);
  }

  // should there really be many events allowed?
  emit(eventName: string, value: object | null) {
    this.subscriptions.forEach((sub) => {
      if (sub.eventName === eventName) {
        sub.callback(value);
      }
    });
  }


  unsubscribe(caller: GameObject) {
    this.subscriptions = this.subscriptions.filter((sub) => sub.caller !== caller);
  }
}

export const gameEvents = new Events();