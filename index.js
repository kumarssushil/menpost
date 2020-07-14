console.log("this is my project of javascript project");
//utility function to get element from string
function getelementfromstring(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//initialize no.of parameters
let addedparamcount = 0;
//hide the parametersbox initially
let parametersbox = document.getElementById('parametersbox');
parametersbox.style.display = 'none';

// if the user clicks on params , hide the json box
let paramsradio = document.getElementById('paramsradio');
paramsradio.addEventListener('click', ()=>{
    document.getElementById('requestjsonbox').style.display = 'none';
    document.getElementById('parametersbox').style.display = 'block';
})

// if the user clicks on json Box, hide the params box
let jsonradio = document.getElementById('jsonradio');
jsonradio.addEventListener('click', ()=>{
    document.getElementById('requestjsonbox').style.display = 'block';
    document.getElementById('parametersbox').style.display = 'none';
})

// if the user clicks on plus button then add more parameter
let addparam = document.getElementById('addparam');
addparam.addEventListener('click',()=>{
    let params = document.getElementById('params');
    let string = ` <div class="form-row my-3">
                    <label for="url" class="col-sm-2 col-form-label">parameter ${addedparamcount+2}</label>
                    <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterkey${addedparamcount+2}" placeholder="enter parameter  ${addedparamcount+2} key">
                    </div>
                    <div class=" col-md-4">
                    <input type="text" class="form-control" id="parametervalue${addedparamcount+2}"
                    placeholder="enter parameter  ${addedparamcount+2} value">
                    </div>
                    <button class="btn btn-primary deleteparam">-</button>
                </div>`;
    // conver the element string to dom node
    let paramelement = getelementfromstring(string);
    // console.log(paramelement);
    params.appendChild(paramelement);

    //to delete te parameter box on clicking the minus button
    let deleteparam = document.getElementsByClassName('deleteparam');
    for(item of deleteparam){
        item.addEventListener('click', (e)=>{
            //add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();

        })
    }
    addedparamcount ++;

});
// if the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    //show please wait in the response box
    document.getElementById('responsejsontext').value = "please wait fetcching response...";
    //fetch all the value user has entered
    let url = document.getElementById("url").value;
    let requesttype = document.querySelector("input[name='requesttype']:checked").value;
    let contenttype  = document.querySelector("input[name='contenttype']:checked").value;
    //log all the value in the console.for debugging
    
    //if user has used params option instead of json, collect all the parameter in an object
    if(contenttype == 'params'){
        data = {};
        for(i=0; i<addedparamcount+1; i++){
            if(document.getElementById('parameterkey' +(i+1)) != undefined){
                
                let key = document.getElementById('parameterkey' + (i+1)).value;
                let value = document.getElementById('parametervalue' + (i+1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestjsontext').value;
    }
    console.log('URL is',url)
    console.log('requesttype is', requesttype);
    console.log('contenttype is',contenttype);
    console.log('data is',data);


    if(requesttype == 'GET'){
        fetch(url, {
            method: 'GET',
            
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('responsejsontext').value = text;
        });
    }

    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers:{
                "content-type": "applicaton/json; charset=UTF-8"
            }
            
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('responsejsontext').value = text;
        });

    }
})