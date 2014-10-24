"use strict";!function(){function a(a){a.when("/error/:realm/:character",{templateUrl:"views/error.html",controller:"ErrorCtrl"}).when("/:region/:realm/:character/achievements/:category",{templateUrl:"views/achievements.html",controller:"AchievementsCtrl"}).when("/:region/:realm/:character/collectable/battlepets",{templateUrl:"views/battlePets.html",controller:"BattlePetsCtrl"}).when("/:region/:realm/:character/calendar",{templateUrl:"views/calendar.html",controller:"CalendarCtrl"}).when("/:region/:realm/:character/collectable/companions",{templateUrl:"views/companions.html",controller:"CompanionsCtrl"}).when("/:region/:realm/:character/collectable/mounts",{templateUrl:"views/mounts.html",controller:"MountsCtrl"}).when("/:region/:realm/:character",{templateUrl:"views/overview.html",controller:"OverviewCtrl"}).when("/:region/:realm/:character/reputation",{templateUrl:"views/reputation.html",controller:"ReputationCtrl"}).when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).otherwise({redirectTo:"/"})}angular.module("simpleArmoryApp",["ngRoute","ui.bootstrap"]).config(a),a.$inject=["$routeProvider"]}(),function(){function a(a,b,c,d){function e(a){var b=a;switch(a){case"general":b="General";break;case"quests":b="Quests";break;case"exploration":b="Exploration";break;case"pvp":b="Player vs. Player";break;case"dungeons":b="Dungeons & Raids";break;case"professions":b="Professions";break;case"reputation":b="Reputation";break;case"scenarios":b="Scenarios";break;case"events":b="World Events";break;case"pets":b="Pet Battles";break;case"collections":b="Collections";break;case"garrisons":b="Garrisons";break;case"legacy":b="Legacy";break;case"feats":b="Feats of Strength"}return b}d.ga("send","pageview","Achievements"),a.superCat=e(c.category),b.getAchievements().then(function(b){a.achievements=b[a.superCat]}),a.getImageSrc=function(a){return 8468===a.id?"images/galakras.png":a.completed?"http://wow.zamimg.com/images/wow/icons/medium/"+a.icon.toLowerCase()+".jpg":"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="},a.border=function(a){return a.completed?"borderOff":"borderOn"}}angular.module("simpleArmoryApp").controller("AchievementsCtrl",a),a.$inject=["$scope","AchievementsService","$routeParams","$window"]}(),function(){function a(a,b,c,d){a.isLoggedIn=!1,a.$on("$locationChangeSuccess",function(){if("/error"===c.$$path)a.character=null,a.isLoggedIn=!1;else if(""!==c.$$path&&"/"!==c.$$path){var d=new RegExp("([^/]+)/([^/]+)/([^/]+)/?([^/]+)?").exec(c.$$path);d=d?d:{},b.getCharacter({region:d[1],realm:d[2],character:d[3]}).then(function(b){a.character=b[0],a.isLoggedIn=!0})}}),a.percent=function(a,b){return d("number")(a/b*100,0)},a.achFormater=function(b,c){if(!b||!c)return"";var d=a.percent(b,c);return 18>d?d+"%":""+b+" / "+c+" ("+d+"%)"},a.getImageSrc=function(a){return a.collected?"http://wow.zamimg.com/images/wow/icons/medium/"+a.icon.toLowerCase()+".jpg":"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="}}angular.module("simpleArmoryApp").controller("ApplicationCtrl",a),a.$inject=["$scope","LoginService","$location","$filter"]}(),function(){function a(a,b){b.getItems("battlepets","pets","creatureId").then(function(b){a.items=b}),a.qualityToBackground=function(a){var b="#fff";switch(a.quality){case"poor":b="#7F7F7F";break;case"common":b="#F0F0F0";break;case"uncommon":b="#22B14C";break;case"rare":b="#3F48CC"}return"background:"+b}}angular.module("simpleArmoryApp").controller("BattlePetsCtrl",a),a.$inject=["$scope","MountsAndPetsService"]}(),function(){function a(a,c,d,e){function f(b,c){var e=[,"January","February","March","April","May","June","July","August","September","October","November","December"],f=[],h=new Date,i={},j="";angular.forEach(b,function(a){angular.forEach(a.categories,function(a){angular.forEach(a.zones,function(a){angular.forEach(a.achievements,function(a){if(a.completed){var b=new Date(a.completed),c=""+b.getFullYear()+(b.getMonth()<9?"0":"")+(b.getMonth()+1);i[c]||(i[c]=new Array(31)),i[c][b.getDate()]||(i[c][b.getDate()]=[]),i[c][b.getDate()].push(a),i[c].hasAchievements=!0}})})})});for(var k=0,l=!1,m=2008;m<=h.getFullYear();m++)for(var n=1;12>=n;n++){var o=""+m+(10>n?"0":"")+n,p=m===h.getFullYear()&&n===h.getMonth()+1;if(l||i[o]&&i[o].hasAchievements){l=!0;var q=g(n,m,i,c);if(j+='<table class="calendar'+(p?" curCalendar":"")+'" id="calendar'+o+'" style="display: '+(p?"block":"none")+'">',j+=q.rows,j+="</table>",f.push({value:o,text:e[n]+" "+m,index:k++,total:q.total,points:q.points}),p)break}}a.tableHtml=d.trustAsHtml(j),a.months=f}function g(a,c,d,e){for(var f,g="",h=0,i=0,j=e.charAt(0).toUpperCase()+e.slice(1),k=""+c+(10>a?"0":"")+a,l=1;31>=l&&(f=new Date(c,a-1,l),f.getDate()===l);l++){if((1===l||0===f.getDay())&&(g+="<tr>"),1===l&&f.getDay()>0&&(g+='<td colspan="'+f.getDay()+'" class="dayspacer"></td>'),g+="<td>"+l,d[k]&&d[k][l]){var m=d[k][l];m.sort(b),g+="<div>",angular.forEach(m,function(a){g+='<a href="http://www.wowhead.com/achievement='+a.id+'" rel="who='+j+"&amp;when="+a.completed+'"><img src="http://wow.zamimg.com/images/wow/icons/medium/'+a.icon.toLowerCase()+'.jpg" width="36" height="36" border="0"></a>',h++,i+=a.points}),g+="</div>"}g+="</td>",6===f.getDay()&&(g+="</tr>")}return f.getDay()<6&&(g+='<td colspan="'+(6-f.getDay())+'" class="dayspacer"></td>'),g+="</tr>",{rows:g,total:h,points:i}}c.getAchievements().then(function(b){f(b,e.character),a.selectedMonth=a.months[a.months.length-1],a.selectionChanged()}),a.leftOneMonth=function(){a.selectedMonth.index>0&&(a.selectedMonth=a.months[a.selectedMonth.index-1],a.selectionChanged())},a.rightOneMonth=function(){a.selectedMonth.index<a.months.length-1&&(a.selectedMonth=a.months[a.selectedMonth.index+1],a.selectionChanged())},a.selectionChanged=function(){var b=$(".curCalendar");b.removeClass("curCalendar"),b.hide();var c=$("#calendar"+a.selectedMonth.value);c.addClass("curCalendar"),c.show(),a.totalForMonth=a.selectedMonth.total,a.totalPoints="("+a.selectedMonth.points+" points)"}}function b(a,b){return a.completed===b.completed?parseInt(a.id,10)<parseInt(b.id,10)?-1:1:a.completed<b.completed?-1:1}angular.module("simpleArmoryApp").controller("CalendarCtrl",a),a.$inject=["$scope","AchievementsService","$sce","$routeParams"]}(),function(){function a(a,b){b.getItems("pets","pets","spellId").then(function(b){a.items=b})}angular.module("simpleArmoryApp").controller("CompanionsCtrl",a),a.$inject=["$scope","MountsAndPetsService"]}(),function(){function a(a,b){a.character=b.character,a.realm=b.realm}angular.module("simpleArmoryApp").controller("ErrorCtrl",a),a.$inject=["$scope","$routeParams"]}(),function(){function a(a,b){function c(a){return a?"/"+a.region.toLowerCase()+"/"+a.realm.toLowerCase()+"/"+a.name.toLowerCase():"#"}a.isCollapsed=!0,a.getUrl=function(b){var d="#"+c(a.character);return""!==b&&(d+="/"+b),d},a.isActive=function(d,e){if(e)return b.path().indexOf(d)>0;var f=c(a.character);return""!==d&&(f+="/"+d),b.path()===f},a.guildName=function(){return a.character&&a.character.guild?"<"+a.character.guild.name+">":""},a.imgUrl=function(){if(a.character){var b=a.character;return"http://"+b.region+".battle.net/static-render/"+b.region+"/"+b.thumbnail}return""},a.armoryUrl=function(){if(a.character){var b=a.character;return"http://"+b.region+".battle.net/wow/en/character/"+b.realm+"/"+b.name.toLowerCase()+"/advanced"}return"#"}}angular.module("simpleArmoryApp").controller("HeaderCtrl",a),a.$inject=["$scope","$location"]}(),function(){function a(a,b,c,d){var e=c.open({templateUrl:"ModelLogin.html",controller:"ModalInstanceCtrl",backdrop:"static"});e.opened.then(function(){window.setTimeout(function(){$("#realmSelection").focus()},50)}),e.result.then(function(a){d.url(a.region+"/"+a.realm+"/"+a.character)}),b.$on("$routeChangeSuccess",function(){e.dismiss()})}function b(a,b,c){a.realms=[{name:"Loading realms..."}],c.getRealms().then(function(b){a.realms=[],angular.forEach(b[0].data.realms,function(a){this.push({value:{realm:a.slug,region:"us"},text:a.name+" US"})},a.realms),angular.forEach(b[1].data.realms,function(a){this.push({value:{realm:a.slug,region:"eu"},text:a.name+" EU"})},a.realms)}),a.ok=function(){b.close({region:a.selectedRealm.region,realm:a.selectedRealm.realm,character:a.characterName})},a.marko=function(){b.close({region:"us",realm:"proudmoore",character:"marko"})}}angular.module("simpleArmoryApp").controller("LoginCtrl",a).controller("ModalInstanceCtrl",b),a.$inject=["$scope","$rootScope","$modal","$location","$timeout"],b.$inject=["$scope","$modalInstance","BlizzardRealmService"]}(),function(){function a(a,b){b.getItems("mounts","mounts","spellId").then(function(b){a.items=b})}angular.module("simpleArmoryApp").controller("MountsCtrl",a),a.$inject=["$scope","MountsAndPetsService"]}(),function(){function a(a,b,c){b.getAchievements().then(function(b){a.achievements=b}),a.baseUrl="#"+c.$$path}angular.module("simpleArmoryApp").controller("OverviewCtrl",a),a.$inject=["$scope","AchievementsService","$location"]}(),function(){function a(a,b){b.getFactions().then(function(b){a.items=b})}angular.module("simpleArmoryApp").controller("ReputationCtrl",a),a.$inject=["$scope","FactionsService"]}(),function(){function a(a,b,c,d){return{getCharacter:function(e){function f(){b.log("Trouble fetching character from battlenet"),a.url("error/"+e.realm+"/"+e.character)}function g(a){return a.data.region=e.region,a.data.faction=[,"A","H","A","A","H","H","A","H","H","H","Alliance",,,,,,,,,,,"A",,,"A","H"][a.data.race],a.data}b.log("Fetching "+e.character+" from server "+e.realm+"...");var h=d.defer();setTimeout(function(){h.resolve("hello world")},1);var i=c.jsonp("http://"+e.region+".battle.net/api/wow/character/"+e.realm+"/"+e.character+"?fields=pets,mounts,achievements,guild,reputation&jsonp=JSON_CALLBACK",{cache:!0}).error(f).then(g);return d.all([i,h.promise])}}}angular.module("simpleArmoryApp").factory("LoginService",a),a.$inject=["$location","$log","$http","$q"]}(),function(){function a(a,b,c,d){function e(a,c){var d={},e={},f=0,g=0,h=0,i=0,j={};b.log("Parsing achievements.json..."),angular.forEach(c.achievements.achievementsCompleted,function(a,b){e[a]=c.achievements.achievementsCompletedTimestamp[b],j[a]=!1}),angular.forEach(a,function(a){var b=0,k=0;d[a.name]={},d[a.name].categories=[],angular.forEach(a.cats,function(l){var m={name:l.name,zones:[]};angular.forEach(l.zones,function(d){var l={name:d.name,achievements:[]};angular.forEach(d.achs,function(d){j[d.id]=!0;var m=d,n=!1;m.completed=e[d.id],m.completed&&(m.rel="who="+c.name+"&when="+m.completed),e[d.id]&&(n=!0,l.achievements.push(m),"Feats of Strength"===a.name?h++:"Legacy"===a.name&&i++),"Feats of Strength"===a.name||"Legacy"===a.name||!d.obtainable||""!==d.side&&d.side!==c.faction||(b++,f++,e[d.id]&&(k++,g++),n||l.achievements.push(m))}),l.achievements.length>0&&m.zones.push(l)}),d[a.name].categories.push(m)}),d[a.name].possible=b,d[a.name].completed=k,"Feats of Strength"===a.name?d[a.name].foSTotal=h:"Legacy"===a.name&&(d[a.name].legacyTotal=i)});for(var k in j)j.hasOwnProperty(k)&&!j[k]&&console.log('WARN: Found achievement "'+k+'" from character but not in db.');return d.possible=f,d.completed=g,d}return{getAchievements:function(){return c.getCharacter({region:d.region,realm:d.realm,character:d.character}).then(function(b){return a.get("data/achievements.json",{cache:!0}).then(function(a){return e(a.data.supercats,b[0])})})}}}angular.module("simpleArmoryApp").factory("AchievementsService",a),a.$inject=["$http","$log","LoginService","$routeParams"]}(),function(){function a(a,b,c){return{getRealms:function(){c.log("Fetching server list for us...");var d=a.jsonp("http://us.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK");c.log("Fetching server list for eu...");var e=a.jsonp("http://eu.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK");return b.all([d,e])}}}angular.module("simpleArmoryApp").factory("BlizzardRealmService",a),a.$inject=["$http","$q","$log"]}(),function(){function a(a,b,c,d){function e(a,b,c,d){var e={categories:[]},f={},g=0,h=0,i={};angular.forEach(b[c].collected,function(a){f[a[d]]=a,i[a[d]]=!1}),angular.forEach(a,function(a){var c={name:a.name,subCategories:[]};e.categories.push(c),angular.forEach(a.subcats,function(a){var e={name:a.name,items:[]};angular.forEach(a.items,function(a){var c=a;if(c.spellId=a.spellid,delete c.spellid,i[c[d]]=!0,f[c[d]]){var j=f[c[d]];if(c.collected=!0,g++,j.qualityId){var k="";switch(j.qualityId){case 0:k="poor";break;case 1:k="common";break;case 2:k="uncommon";break;case 3:k="rare";break;case 4:k="epic";break;case 5:k="legendary"}c.quality=k}if(j.stats){if(j.stats.breedId){var l="";switch(j.stats.breedId){case 4:case 14:l="P/P";break;case 5:case 15:l="S/S";break;case 6:case 16:l="H/H";break;case 7:case 17:l="H/P";break;case 8:case 18:l="P/S";break;case 9:case 19:l="H/S";break;case 10:case 20:l="P/B";break;case 11:case 21:l="S/B";break;case 12:case 22:l="H/B";break;case 3:case 13:l="B/B"}c.breed=l}c.level=j.stats.level}}var m="spell="+c.spellId;a.itemId?m="item="+a.itemId:a.allianceId&&"A"===b.faction?m="item="+a.allianceId:a.hordeId&&"H"===b.faction?m="item="+a.hordeId:a.creatureId&&(m="npc="+a.creatureId),c.link=m;var n=c.collected,o=n||a.obtainable;if(a.allowableRaces.length>0){var p=!1;angular.forEach(a.allowableRaces,function(a){a===b.race&&(p=!0)}),p||(o=!1)}if(a.allowableClasses&&a.allowableClasses.length>0){var q=!1;angular.forEach(a.allowableClasses,function(a){a===b.class&&(q=!0)}),q||(o=!1)}o&&(e.items.push(c),h++)}),e.items.length>0&&c.subCategories.push(e)})});for(var j in i)i.hasOwnProperty(j)&&!i[j]&&console.log('WARN: Found item "'+j+'" from character but not in db.');return e.collected=g,e.possible=h,e}return{getItems:function(f,g,h){return c.getCharacter({region:d.region,realm:d.realm,character:d.character}).then(function(c){return a.get("data/"+f+".json",{cache:!0,isArray:!0}).then(function(a){return b.log("Parsing "+f+".json..."),e(a.data,c[0],g,h)})})}}}angular.module("simpleArmoryApp").factory("MountsAndPetsService",a),a.$inject=["$http","$log","LoginService","$routeParams"]}(),function(){function a(a,b,c,d){function e(a,c){var d={};d.categories=[];var e={};return b.log("Parsing factions.json..."),angular.forEach(c.reputation,function(a){e[a.id]={level:a.standing,perc:a.value/a.max*100}}),angular.forEach(a,function(a){var b={};b.name=a.name,b.factions=[];var c=!1;angular.forEach(a.factions,function(a){var d={};d.id=a.id,d.name=a.name;var h=e[d.id];h&&(g(a.id)?(d.stranger=f(0,h),d.acquaintance=f(1,h),d.buddy=f(2,h),d.friend=f(3,h),d.goodFriends=f(4,h),d.bestFriends=f(5,h),d.isTiller=!0,c=!0):(d.hated=f(0,h),d.hostel=f(1,h),d.unfriendly=f(2,h),d.neutral=f(3,h),d.friendly=f(4,h),d.honored=f(5,h),d.revered=f(6,h),d.exalted=f(7,h)),b.factions.push(d))}),c&&(b.isTiller=!0),b.factions.length>0&&d.categories.push(b)}),d}function f(a,b){return a===b.level?b.perc:a<b.level?100:0}function g(a){return"1273"===a||"1275"===a||"1276"===a||"1277"===a||"1278"===a||"1279"===a||"1280"===a||"1281"===a||"1282"===a||"1283"===a}return{getFactions:function(){return c.getCharacter({region:d.region,realm:d.realm,character:d.character}).then(function(b){return a.get("data/factions.json",{cache:!0}).then(function(a){return e(a.data,b[0])})})}}}angular.module("simpleArmoryApp").factory("FactionsService",a),a.$inject=["$http","$log","LoginService","$routeParams"]}(),function(){function a(){return function(a,b,c){b.bind("keydown keypress",function(b){13===b.which&&(a.$apply(function(){a.$eval(c.ngEnter)}),b.preventDefault())})}}angular.module("simpleArmoryApp").directive("ngEnter",a)}(),function(){function a(){return{controller:c,restrict:"E",scope:{faction:"="},templateUrl:function(){return"views/reputationRow.html"}}}angular.module("simpleArmoryApp").directive("saReputationRow",a);var b={hated:150,hostel:25,unfriendly:25,neutral:25,friendly:40,honored:60,revered:85,exalted:10,stranger:50,acquaintance:50,buddy:50,friend:50,goodFriends:50,bestFriends:50},c=function(a){a.getWidth=function(c){var d=a.faction[c]?a.faction[c]:0;return d/100*b[c]+"px"}};c.$inject=["$scope"]}();