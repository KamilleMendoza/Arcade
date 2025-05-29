//well sticks

//Updated Suggested Entity Name Calculator
var grid = FeatureSetByPortalItem(Portal('***'), 'itemID', 0, ['objectid','field'])
var last_point = Geometry($feature).paths[-1][-1]
var lsd_now = First(Intersects(grid,last_point))


//bh layer - mosaic
var stickbh = FeatureSetByName($map, "Wells BH",['*'])

//var stickbhCount = Count(Intersects(lsd_now, $feature))
var stickbhCount = Count(Intersects(lsd_now, stickbh))
//return stickbhCount

//well bh - WELLS_BH_P - Return all BH points
//var bhl = FeatureSetByPortalItem(Portal('***'),'itemID', 0,  ['CPA_UWI'], "RIGHT('uwi',1)=0")
var bhl = FeatureSetByName($map,'Bottom Hole Locations', ['CPA_UWI'], true);

//Count all bh wells inside the LSD
var bhlCount = Count(Intersects(lsd_now, bhl))

//Count all vert and lateral wells inside the LSD
var totalCt = stickbhCount + bhlCount
//var skWells = Count(Intersects(lsd_now, stickbh)) + 1

var next_event = stickbhCount + bhlCount + 1

//province - SDE_RO data tsore
var province= First(Intersects($feature,FeatureSetByPortalItem(Portal('***'), 'itemID', 0, ['prov_name'], true)))
var prov1 = province.prov_name


//var output = Text(next_event+ "/" + lsd_now.uuid + "/00")
var output = ""

if (totalCt == 0) {
  if (prov1 == 'Alberta'){return Text("00/" + lsd_now.uuid + "/0")}
  if (prov1 == 'Saskatchewan') {return Text("0" + next_event+ "/" + lsd_now.uuid + "/0")}
}

if (totalCt == 1) {
  if (prov1 == 'Alberta'){return Text("02/"+ lsd_now.uuid + "/0")}
  if (prov1 == 'Saskatchewan') {return Text("0" + next_event+ "/" + lsd_now.uuid + "/0")}
}

if (totalCt > 1 || totalCt < 10){
  if (prov1 == 'Alberta') {return Text("0" + next_event+ "/" + lsd_now.uuid + "/0")}
  if (prov1 == 'Saskatchewan') {return Text("0" + next_event+ "/" + lsd_now.uuid + "/0")}
}

if (totalCt > 10){
  if (prov1 == 'Alberta') {return Text("0"+ next_event+ "/" + lsd_now.uuid + "/0")}
  if (prov1 == 'Saskatchewan'){return Text(next_event+ "/" + lsd_now.uuid + "/0")}
  }

else return Text(next_event+ "/" + lsd_now.uuid + "/0")
return output


