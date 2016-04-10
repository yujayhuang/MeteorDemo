import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
	addData:function(){},
	delData:function(){},
	modifyData:function(){},
	searchData:function(){},
	});

});
