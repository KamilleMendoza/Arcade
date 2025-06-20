// This script is designed to run on the 'Add' operation in the OriginTable
// Define the origin feature
var originFeature = $feature


// Check if the feature has been added
if (IsEmpty(originFeature)) {
    return null; // Exit if no feature is present
}
// Define the target table

var relTable = "related table"



return  {
  "result" : $feature.ent_uuid,
        "edit": [
          {
            //className we want to edit:
            "className": relTable,
             //the type of edit, 'adds'
            "adds": [
              {
                //the attribute we want to add, the name
                "attributes": 
                {
                  //"name": originFeature.name, copy the global id from mosaic_sticks_l into parent_globalid field

                 "ent_uuid": $feature.ent_uuid,
                 "ent_name": $feature.ent_name,
               
                 "parent_globalid":$feature.globalid

            
                },
                "geometry": Geometry($feature).paths[-1][-1]
                
              }
            ]

}
        

]
               


}
