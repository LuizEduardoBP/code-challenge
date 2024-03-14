import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { communitiesMethods } from './methods/CommunitiesMethods.js'
import { People } from '../people/people.js';


Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();
  communitiesMethods();
});
