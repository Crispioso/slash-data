var taxonomy = ["businessindustryandtrade", "business", "activitysizeandlocation", "businessinnovation", "businessservices", "changestobusiness", "bankruptcyinsolvency", "businessbirthsdeathsandsurvivalrates", "mergersandacquisitions", "constructionindustry", "internationaltrade", "itandinternetindustry", "manufacturingandproductionindustry", "retailindustry", "tourismindustry", "economy", "economicoutputandproductivity", "output", "productivitymeasures", "publicservicesproductivity", "environmentalaccounts", "governmentpublicsectorandtaxes", "localgovernmentfinance", "publicsectorfinance", "publicspending", "researchanddevelopmentexpenditure", "taxesandrevenue", "grossdomesticproductgdp", "grossvalueaddedgva", "inflationandpriceindices", "investmentspensionsandtrusts", "nationalaccounts", "balanceofpayments", "satelliteaccounts", "supplyandusetables", "uksectoraccounts", "regionalaccounts", "grossdisposablehouseholdincome", "employmentandlabourmarket", "peopleinwork", "earningsandworkinghours", "employmentandemployeetypes", "labourproductivity", "workplacedisputesandworkingconditions", "workplacepensions", "peoplenotinwork", "unemployment", "publicsectorpersonnel", "peoplepopulationandcommunity", "birthsdeathsandmarriages", "adoption", "ageing", "conceptionandfertilityrates", "deaths", "divorce", "families", "lifeexpectancies", "livebirths", "marriagecohabitationandcivilpartnerships", "maternities", "stillbirths", "community", "cohesionandparticipation", "neighbourhoods", "crimeandjustice", "culturalidentity", "ethnicity", "language", "religion", "sexuality", "educationandchildcare", "elections", "electoralregistration", "generalelections", "localgovernmentelections", "healthandsocialcare", "causesofdeath", "childhealth", "conditionsanddiseases", "disability", "drugusealcoholandsmoking", "healthcaresystem", "healthinequalities", "healthandlifeexpectancies", "healthandwell-being", "mentalhealth", "socialcare", "householdcharacteristics", "homeinternetandsocialmediausage", "housing", "leisureandtourism", "personalandhouseholdfinances", "debt", "expenditure", "incomeandwealth", "pensionssavingsandinvestments", "populationandmigration", "internationalmigration", "migrationwithintheuk", "populationestimates", "populationprojections", "wellbeing"];

var path = window.location.protocol + "//" + window.location.host + window.location.pathname,
    urlEnd = path.match('[^/]+(?=/$|$)'),
    data = "data";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var newCommand = request.command;
    console.log("Received command: " + newCommand);
    
    if (!path.match("/$")) {
        data = "/data";
    }
    
    if (newCommand === "json") {
        var params = window.location.search;
        if (urlEnd[0] !== 'data') {
            window.location.href = path + data + params;
        } else {
            var lastSlash = path.lastIndexOf("/");
            path = path.substring(0,lastSlash);
            window.location.href = path + params;
        }
    } else if (newCommand === "publications" || newCommand === "datalist") {
        if (!path.match("/$")) {
            newCommand = "/" + newCommand;
        }
        if (taxonomy.indexOf(urlEnd[0]) > -1) {
            window.location.href = path + newCommand;
        } else if (newCommand.indexOf(urlEnd[0])) {
            path = path.replace(newCommand, '');
            window.location.href = path;
        }
    }
    
    sendResponse({"action": "Actioned trigger: " + newCommand});
});
