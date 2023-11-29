

let title = document.getElementById("title");
let price = document.getElementById("price");
let total = document.getElementById("totales");
let count = document.getElementById("countes");
let category = document.getElementById("category");
let textarea = document.querySelector("textarea");
let submit = document.getElementById("submit");
let search = document.getElementById("searches");

let imgMainAdd = document.querySelector(".imgMainAdd");
let imgOneAdd = document.querySelector(".imgOneAdd");
let imgTwoAdd = document.querySelector(".imgTwoAdd");
let imgThreeAdd = document.querySelector(".imgThreeAdd");




let mood = "creat";
let tmp;

function getTotal(){ 
    
    if(price.value !=''){
          let result =+price.value ;
          total.innerHTML =result;
          total.parentElement.style.cssText ="background-color: green;";
      
    }
    else{
        total.innerHTML = '';
        total.parentElement.style.cssText ="background-color: red;";
    }
}



/////////    save data in local storge



let datpro;

if(localStorage.control != null){
    datpro = JSON.parse(localStorage.control);
}else{
    datpro =[];
}



submit.onclick = function(){

  
  let newPro ={
    title: title.value,
    price: price.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
    textarea: textarea.value,
    imgMain: imgMainAdd.src,
    imgOne: imgOneAdd.src,
    imgTwo: imgTwoAdd.src,
    imgThree: imgThreeAdd.src
  }



  if(title.value != '' && price.value != '' && category.value != '' &&  count.value < 250 && textarea.value != '' && count.value >0 && count.value != '' ){



    if(mood === "creat"){

      if(newPro.count > 1){


           datpro.push(newPro);

     } else{
       datpro.push(newPro);
     }

    }else{
      datpro[tmp] =newPro;
  
      mood ="creat";
      submit.innerHTML ="Creat";
      count.style.display ="block";
    }
    clearData();


}




  localStorage.setItem("control", JSON.stringify(datpro))

  showData();

}





/////////    clear input


function clearData (){
  title.value ='';
  price.value ='';
  count.value ='';
  category.value ='';
  textarea.value = '';
  imgMainAdd.src = '';
  imgOneAdd.src = '';
  imgTwoAdd.src = '';
  imgThreeAdd.src = '';

}


//////////   read data from localstorge

function showData(){
getTotal();

    let table = '';

    for(let i =0 ; i< datpro.length; i++){
        
    table += `
    <tr>
         <td>${i+1}</td>
         <td>${datpro[i].title}</td>
         <td><img src="${datpro[i].imgMain}" alt=""></td>
         <td>${datpro[i].price}</td>
         <td>${datpro[i].count}</td>
         <td>${datpro[i].category}</td>
         <td><button onclick="upDate(${i})">Update</button></td>
         <td><button onclick="deleteData(${i})" >Delete</button></td>
     </tr>     `;
       
    }

    document.getElementById("tbody").innerHTML = table;
    
    let deleAll = document.querySelector("#deletAll");
    if(datpro.length > 0){
        
        deleAll.innerHTML = `<button onclick="deletAll()" > Delet All (${datpro.length}) </button> `;
    }else{
        deleAll.innerHTML = '' ;
    }
}

showData();

////////////////   delete

function deleteData(i) {
    datpro.splice(i,1);
    localStorage.control = JSON.stringify(datpro);
    showData();
}


////////   delete All

function deletAll(){
  localStorage.removeItem("control");
  datpro.splice(0) 
  showData();
}

//// update

function upDate (i){
tmp = i;

 title.value = datpro[i].title;
 price.value = datpro[i].price ;
 count.value = datpro[i].count;
 textarea.value = datpro[i].textarea;
 imgMainAdd.src = datpro[i].imgMain;
 imgOneAdd.src = datpro[i].imgOne;
 imgTwoAdd.src = datpro[i].imgTwo;
 imgThreeAdd.src = datpro[i].imgThree;
 getTotal();
 submit.innerHTML ="Update";
 category.value = datpro[i].category;
 mood ="update";
 scroll({
  top:0,
  behavior:"smooth"
 })

} 


// search 
let searchMode = "title";
function getSearchMood(id) {
  

   if(id == "searchTitle"){
    searchMode = "title";
    search.placeholder = "Search By Title"; 
   }
   else{
    searchMode ="cotegory";
    search.placeholder = "Search By Category";
   }
   search.focus();
   search.value ='';
   showData();

}


function searchData(value) {

  let table = '';
  if(searchMode == "title"){


    for(let i =0 ; i < datpro.length ;i++){
 
      if(  datpro[i].title.toUpperCase().includes(value.toUpperCase()) || datpro[i].category.toUpperCase().includes(value.toUpperCase())){
        table += `
        <tr>
             <td>${i+1}</td>
             <td>${datpro[i].title}</td>
             <td><img src="${datpro[i].imgMain}" alt=""></td>
             <td>${datpro[i].price}</td>
             <td>${datpro[i].count}</td>
             <td>${datpro[i].category}</td>
             <td><button onclick="upDate(${i})" >Update</button></td>
             <td><button onclick="deleteData(${i})" >Delete</button></td>
         </tr>     `;
        
        
      }
         
    }

  }



  document.getElementById("tbody").innerHTML = table;
};






// collect Img

function collectImg(e) {

  e.nextElementSibling.style.cssText = "display: block";

  e.nextElementSibling.firstElementChild.onclick =function (){
    e.nextElementSibling.style.cssText = "display: none";
  }


  e.nextElementSibling.lastElementChild.onclick =function(){

    if( e.nextElementSibling.lastElementChild.previousElementSibling.value != ""){
        e.nextElementSibling.style.cssText = "display: none";
        e.previousElementSibling.src =   e.nextElementSibling.lastElementChild.previousElementSibling.value;    
        e.nextElementSibling.lastElementChild.previousElementSibling.value ="";
    }

  }
}