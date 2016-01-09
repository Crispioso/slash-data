// function checkSlash(str) {
//     if(!path.match("/$")) {
//         str = "/" + str;
//     }
//     console.log(str);
// }

var taxonomy = ["businessindustryandtrade", "business", "activitysizeandlocation", "businessinnovation", "businessservices", "changestobusiness", "bankruptcyinsolvency", "businessbirthsdeathsandsurvivalrates", "mergersandacquisitions", "constructionindustry", "internationaltrade", "itandinternetindustry", "manufacturingandproductionindustry", "retailindustry", "tourismindustry", "economy", "economicoutputandproductivity", "output", "productivitymeasures", "publicservicesproductivity", "environmentalaccounts", "governmentpublicsectorandtaxes", "localgovernmentfinance", "publicsectorfinance", "publicspending", "researchanddevelopmentexpenditure", "taxesandrevenue", "grossdomesticproductgdp", "grossvalueaddedgva", "inflationandpriceindices", "investmentspensionsandtrusts", "nationalaccounts", "balanceofpayments", "satelliteaccounts", "supplyandusetables", "uksectoraccounts", "regionalaccounts", "grossdisposablehouseholdincome", "employmentandlabourmarket", "peopleinwork", "earningsandworkinghours", "employmentandemployeetypes", "labourproductivity", "workplacedisputesandworkingconditions", "workplacepensions", "peoplenotinwork", "unemployment", "publicsectorpersonnel", "peoplepopulationandcommunity", "birthsdeathsandmarriages", "adoption", "ageing", "conceptionandfertilityrates", "deaths", "divorce", "families", "lifeexpectancies", "livebirths", "marriagecohabitationandcivilpartnerships", "maternities", "stillbirths", "community", "cohesionandparticipation", "neighbourhoods", "crimeandjustice", "culturalidentity", "ethnicity", "language", "religion", "sexuality", "educationandchildcare", "elections", "electoralregistration", "generalelections", "localgovernmentelections", "healthandsocialcare", "causesofdeath", "childhealth", "conditionsanddiseases", "disability", "drugusealcoholandsmoking", "healthcaresystem", "healthinequalities", "healthandlifeexpectancies", "healthandwell-being", "mentalhealth", "socialcare", "householdcharacteristics", "homeinternetandsocialmediausage", "housing", "leisureandtourism", "personalandhouseholdfinances", "debt", "expenditure", "incomeandwealth", "pensionssavingsandinvestments", "populationandmigration", "internationalmigration", "migrationwithintheuk", "populationestimates", "populationprojections", "wellbeing"];

var endpoints = ["datalist", "publications"];

var path = window.location.pathname,
    domain = window.location.protocol + "//" + window.location.host,
    urlEnd = path.match('[^/]+(?=/$|$)'),
    data = "data",
    atRoot = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var newCommand = request.command;
    var pageAction = request.message;
    // console.log("Received command: " + newCommand);
    // console.log(request);
    
    if (!path.match("/$")) {
        data = "/data";
    }
    
    if (newCommand === "json" || pageAction) { // Toggle JSON endpoint
        var params = window.location.search;
        if (!urlEnd || urlEnd[0] !== 'data') {
            window.location.href = domain + path + data + params;
        } else {
            var lastSlash = path.lastIndexOf("/");
            path = path.substring(0,lastSlash);
            window.location.href = domain + path + params;
        }
    } else if (endpoints.indexOf(newCommand) > -1) { // Toggle list page endpoints
        if (!path.match("/$")) { // Add slash if url doesn't end in one
            newCommand = "/" + newCommand;
        }
        if (!urlEnd || urlEnd[0] === "search") { // Add endpoint to absolute root
            window.location.href = domain + "/" + newCommand;
            console.log(path);
        } else if (taxonomy.indexOf(urlEnd[0]) > -1 && newCommand.indexOf(urlEnd[0]) == -1) { // Toggle endpoints if on normal taxonomy page
            window.location.href = domain + path + newCommand;
        } else if (newCommand.indexOf(urlEnd[0]) > -1 && !atRoot) { // Remove endpoint if matches current command - exclude root/search page
            path = path.replace(newCommand, '');
            window.location.href = domain + path;
        } else if (endpoints.indexOf(urlEnd[0]) > -1) { // Allow toggle of other end point if already on list page
            path = path.replace("/" + urlEnd[0], newCommand);
            window.location.href = domain + path;
        }
    }
    
    if (newCommand) {
        sendResponse({"action": newCommand});
    }
    if (pageAction) {
        sendResponse({"action": pageAction});
    }
    
});
