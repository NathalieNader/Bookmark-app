var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");

var websiteList;

if(localStorage.getItem("websiteList") === null) {
    websiteList = [];
}else{
    websiteList = JSON.parse(localStorage.getItem("websiteList"));
    displaySites(websiteList);
}

function addSite(){
    if(validateName() === true && validateURL() === true){
        var website={
            name: siteName.value,
            url: siteURL.value
        }
        websiteList.push(website);
        clearForm();
        displaySites(websiteList);
        localStorage.setItem("websiteList", JSON.stringify(websiteList));
    }else{
        var cartona = `<div class="alertPage position-absolute top-0 start-0 bg-black w-100 h-100 d-flex justify-content-center align-items-center">
                            <div class="alertMessage bg-white rounded" id="alertMessage">
                                <div class="icons d-flex justify-content-between">
                                    <div class="circle-icons">
                                        <i class="fa-solid fa-circle text-danger"></i>
                                        <i class="fa-solid fa-circle text-warning "></i>
                                        <i class="fa-solid fa-circle text-success"></i>
                                    </div>
                                    <i class="fa-solid fa-xmark" onclick="exit()"></i>
                                </div>
                                <p>Site Name or Url is not valid, Please follow the rules below :</p>
                                <ul>
                                    <li>
                                        <i class="fa-regular fa-circle-right"></i>
                                        Site name must contain at least 3 characters
                                    </li>
                                    <li>
                                        <i class="fa-regular fa-circle-right"></i>
                                        Site URL must be a valid one
                                    </li>
                                </ul>
                            </div>
                        </div>`

        document.getElementById("alertSection").innerHTML = cartona;
    }
}

function displaySites(list){
    var cartona = '';
    for(var i=0; i<list.length; i++){
        cartona += `<tr>
                        <td>${i+1}</td>
                        <td>${websiteList[i].name}</td>
                        <td>
                            <button class="btn btn-visit" onclick="visitSite(${i})">
                                <i class="fa-solid fa-eye"></i>
                                Visit
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-delete" onclick="deleteSite(${i})">
                                <i class="fa-solid fa-trash"></i>
                                Delete
                            </button>
                        </td>
                    </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function visitSite(index){
    window.open(websiteList[index].url);
}

function deleteSite(index){
    websiteList.splice(index, 1);
    displaySites(websiteList);
    localStorage.setItem("websiteList", JSON.stringify(websiteList));
}

function validateName(){
    var regex = /^\w{3,}$/;

    if(regex.test(siteName.value) == false){
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        return false;
    }else{
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        return true;
    }
}

function validateURL(){
    var regex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/;
    
    if(regex.test(siteURL.value) == false){
        siteURL.classList.add("is-invalid");
        siteURL.classList.remove("is-valid");
        return false;
    }else{
        siteURL.classList.add("is-valid");
        siteURL.classList.remove("is-invalid");
        return true;
    }
}

function clearForm(){
    siteName.value = '';
    siteURL.value = '';
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
}

function exit(){
    document.getElementById("alertSection").innerHTML = '';
}