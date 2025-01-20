var portalObj = Portal('https://portal/gis')
// ItemID
var wells_itemID = '*****'   //itemID
//Wells Layer - Points featureset
var pt_fs = FeatureSetByPortalItem(portalObj, wells_itemID, 0, ['uwi', 'well_name', 'province', 'region', 'sub_region', 'operator'], true)

//Wildfire Buffer - Polygon featureset
var buffer_ID = '*****'   //itemID
//var bufferLayer = FeatureSetByPortalItem(portalObj,buffer_ID, 0, ['*'])

var poly_fs = FeatureSetByPortalItem(portalObj, buffer_ID, 0, ['fire_number'], true)


//Create empty feature array and feature obj for output
var features = [];
var feat;

// Iterate over districts
for (var poly in poly_fs) {
    // Filter points by polygon
    var pts = Intersects(poly, pt_fs);
    
    for (var pt in pts) {
    
        // Create feature with aggregated values
        feat = { 
            'attributes': { 
                'fire_number': poly['fire_number'], 
                'uwi': pt['uwi'],
                'province': pt['province'], 
                'region':pt['region'], 
                'subregion': pt['sub_region']
            }
        };
        
        // Push feature into array
        Push(features, feat);
    };
};
// Create dict for output FeatureSet
var out_dict = { 
    'fields': [
        {'name': 'fire_number', 'alias': 'fire_number', 'type': 'esriFieldTypeString'},
        {'name': 'uwi', 'alias': 'uwi', 'type': 'esriFieldTypeString'},
        {'name': 'province', 'alias': 'province', 'type': 'esriFieldTypeString'},
        {'name': 'region', 'alias': 'region', 'type': 'esriFieldTypeString'},
        {'name': 'subregion', 'alias': 'subregion', 'type': 'esriFieldTypeString'}
    ],
  'geometryType': '', 
  'features': features 
}; 
// Convert dictionary to feature set. 
return FeatureSet(Text(out_dict)); 
