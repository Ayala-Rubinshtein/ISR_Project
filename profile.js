function bin2hex(bin){
    return parseInt(bin, 2).toString(16).toUpperCase()
  }

  function hexToDec(hexString){
    return parseInt(hexString, 16);
  }

function get_real_information(env,part)
{
    switch(env){
        case "HolderIdNumber":
            switch (part){
                case 0:
                    return "AnonymousCard"
                default:
                    return "Personal"
        }
        case "EnvCountryId":
            console.log("ffffffffff")
            if(part==376)
                return "Israel"

        case "EnvIssuingDate":
            var date = new Date(hexToDec(part));  
            return date
        
        case "EnvEndDate":
            var date = new Date(hexToDec(part));  
            return date    
        
        case "HolderBirthDate":
            var date = new Date(hexToDec(part));  
            return date  
    }
    
    return part
}


function hex2bin(hex){
    y=parseInt(hex.toString(), 16).toString(2)
    switch(y.length%4) {
        case 1:
          return "000" + y
        case 2:
            return "00" + y
        case 3:
            return "0" + y
    }
    return y
}

function partOfBin(num,begin,len){
    return num.substr(begin,len)
}

function get_bin_num(hex_num)
{
    bin_num=""
    for (let i=0; i<58;i++)
    {
    bin_num=bin_num+hex2bin(hex_num[i])
    }
    return bin_num
}

function createTable(_json){
    var col = [];
    for (var i = 0; i < _json.length; i++) {
        for (var key in _json[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < _json.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = _json[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function get_profile_information(hex_num){
    bitsArr=[0,3,12,8,26,14,14,3,32,14,30,30,6,14,6,14,2,4]
    envDataStructure = ['EnvApplicationVersionNumber','EnvCountryId', 'EnvIssuerId', 'EnvApplicationNumber', 'EnvIssuingDate', 'EnvEndDate', 'EnvPayMethod', 'HolderBirthDate',
                    'HolderCompany','HolderCompanyID', 'HolderIdNumber', 'HolderProf1Code', 'HolderProf1Date', 'HolderProf2Code', 'HolderProf2Date',
                    'HolderLanguage', 'HolderRFU']
    bin_num=get_bin_num(hex_num)
    sum=0
    _json=[]
    for (let i=0; i<17;i++)
    {
        dict={}
        part=partOfBin(bin_num,bitsArr[i]+sum,bitsArr[i+1])
        sum=sum+bitsArr[i]
        dict["profile"]=envDataStructure[i]
        dict["value"]=get_real_information(envDataStructure[i],bin2hex(part))
        _json[i]=dict
        createTable(_json)
    }
}
    
