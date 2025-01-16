var grid = FeatureSetByPortalItem(Portal('***'), '***', 0, ['objectid','uuid'])
var last_point = Geometry($feature).paths[-1][-1]
var lsd_now = First(Intersects(grid,last_point))



var stickbh = FeatureSetByName($map, "Wells BH",['*'])
//"MOSAIC STICK BH COUNT P F"
//var stickbhCount = Count(Intersects(lsd_now, $feature))
var stickbhCount = Count(Intersects(lsd_now, stickbh))
//return stickbhCount

var bhl = FeatureSetByPortalItem(Portal('***'),'***', 0,  ['CPA_UWI'])
var bhlCount = Count(Intersects(lsd_now, bhl))

var totalCt = stickbhCount + bhlCount
var next_event = stickbhCount + bhlCount + 1

var output = Text(totalCt, '00')
     if (totalCt == 0) {return Text("100/" + lsd_now.uuid + "/00")}
     if (totalCt == 1) {return Text("102/" + lsd_now.uuid + "/00")}
     if (totalCt >= 10) {return "1"+totalCt + "/" +  lsd_now.uuid + "/00"}
     else {return Text("10"+ next_event +"/" + lsd_now.uuid + "/00")}

return output