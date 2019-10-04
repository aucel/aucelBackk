import {EventSubscriber, EntitySubscriberInterface} from "typeorm";

@EventSubscriber()
export class VoterSubscriber implements EntitySubscriberInterface<any> {

}
