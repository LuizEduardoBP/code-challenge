import { Meteor } from 'meteor/meteor';
import { Communities } from '../../communities/communities';
import { People } from '../../people/people';

export const communitiesMethods = () => {
  Meteor.methods({
    'communities.getAll'() {
      return Communities.find().fetch();
    },
    'peoples.getAll'(){
      console.log('uou');
      return People.find().fetch();
    },
    'peoples.updateCommunityId'(personId, newCommunityId) {
      console.log('uou 1');

      return People.update({ _id: personId }, { $set: { communityId: newCommunityId } });
    },
  });
}

