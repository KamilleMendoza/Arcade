//WCAP Production Dashboard - Data Expression- Filter records by Date Range
//Group by UWI - multiple records with the same UWI


// Get your input layer, define which fields to include
var inputLayer = FeatureSetByPortalItem(Portal('***'), 'itemID', 0, ['volume_date', 'uwi', 'sub_area_1', 'sub_area_2','net_oil_vol_bbl', 'net_gas_vol_mcf', 'net_ngl_vol_bbl'], false)


// Define end date - current date
var endDate = Now() // returns current date -  Date only - text


//Define start date (last 3 months)
var strtDate = DateAdd(endDate, -3, 'months') 


//Filter by Date range
var sql = "volume_date BETWEEN  @strtDate and  @endDate"
var prod = Filter(inputLayer, sql)

//return prod


//Group by UWI
//return GroupBy(prod, 'uwi', {name: 'num', expression:'1', statistic: 'AVG'})

//Order by Date - Ascending
var orderDate = OrderBy(prod, 'volume_date ASC')
return orderDate