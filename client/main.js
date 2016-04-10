import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
data=[{info:"John"},{info:"Doe"}];
userInfo=[{}];
Template.demo.onCreated(function demoOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  this.dataInfo=new ReactiveVar(data);
  this.searchInfo=new ReactiveVar(userInfo);
});

Template.demo.helpers({	
	dataInfo(){
	console.log(Template.instance().dataInfo.get());
	return Template.instance().dataInfo.get();
	},
	Info(){
	console.log(Template.instance().searchInfo.get());
	return Template.instance().searchInfo.get();
	}
});
Template.demo.events({
  'submit #addInfo':function(event, instance){
		var name=event.target.name.value;		
		console.log(name);		
		Meteor.call('addData',name);
		event.target.name.value="";
		instance.dataInfo.set(data);
		return false;
	},
	'submit #delInfo':function(event, instance){
		var name=event.target.name.value;
		for(var key in data){
			if (data[key].info!==name){
				event.target.name.value="";
				event.target.name.placeholder="Name Not Found";
			}else if(data[key].info===name){
				if(confirm("Do you want to delete?")===true){
				Meteor.call('delData',key);
				event.target.name.value="";
				event.target.name.placeholder="Delete Info";
				}

			}
		}		
		instance.dataInfo.set(data);
		return false;
	},
	  'submit #modifyInfo':function(event, instance){
		  console.log(event.target.currentName.placeholder);
		  console.log(event.target.newName.placeholder);
		var curName=event.target.currentName.value;
		var NewName=event.target.newName.value;
		for(var key in data){
			console.log(curName);
			if (data[key].info!==curName) {
				event.target.currentName.placeholder="Not Found";
				event.target.newName.placeholder="";
			}else if(data[key].info===curName){
				if(confirm("Do you want to change the name to "+NewName+" ?")===true){
				Meteor.call('modifyData',key,NewName);
				event.target.currentName.placeholder="";
				event.target.newName.placeholder="";
				}				
			}
		}		
		event.target.currentName.value="";
		event.target.newName.value="";
		instance.dataInfo.set(data);
		return false;
	},
	  'submit #searchName'(event, instance) {
    // increment the counter when button is clicked
	var name=event.target.search.value;
		for(var key in data){
			console.log(name);
			if(data[key].info!==name){
				event.target.search.placeholder="Not Found";
		
			}else if(data[key].info===name){			
				Meteor.call('searchData',key);		
				event.target.search.placeholder="search";
					break;
			}
		}
		event.target.search.value="";
		instance.searchInfo.set(userInfo);		
		return false;		
  },
});

Meteor.methods({
	addData:function(name){
		data.push({info:name});
		return data;
	},
		delData:function(index){
		data.splice(index,1);
		return data;
	},
		modifyData:function(index,name){	
		data.splice(index,1,{info:name});
		console.log(data);
		return data;
	},
		searchData:function(index){
		  userInfo[0]=data[index];
		  console.log(userInfo[0]);
		  return userInfo[0];
		}
	});
