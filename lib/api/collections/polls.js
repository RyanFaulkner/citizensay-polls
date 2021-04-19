import { Mongo } from 'meteor/mongo';

export const Polls = new Mongo.Collection('polls');

Meteor.methods({
    "polls.vote"(_id, options) {
        Object.keys(options).forEach(value =>
            Polls.update({_id, "options.value": value}, {
                [options[value] ? "$addToSet": "$pull"]: {"options.$.votes": this.userId}
            })
        );
    }
});

if(Meteor.isServer)
    Meteor.publish('polls', () => Polls.find());