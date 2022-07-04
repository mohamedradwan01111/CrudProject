var nameInput = document.getElementById("productName");
var categoryInput = document.getElementById("productCategory");
var priceInput = document.getElementById("productPrice");
var descInput = document.getElementById("productDescription");
var tbody = document.getElementById("tbody");
// var searchInput = document.getElementById("searchInput");
var searchInput = document.getElementById('searchInput');
// var productlist = [];
var alertNameInp = document.getElementById('alertNameInp');
var addBtn = document.getElementById('addBtn');


if (localStorage.getItem('productData') == null) {
    var productlist = [];
} else {
    var productlist = JSON.parse(localStorage.getItem('productData'));
}




function addProduct() {
    if (validateProductName() == true && priceInput.value != '' && categoryInput.value != '' && descInput.value != '') {
        var newPrice = Number(priceInput.value);
        var singleProduct = {
            productName: nameInput.value,
            productCategory: categoryInput.value,
            productPrice: newPrice,
            productDesc: descInput.value,
        }; //object 
        productlist.push(singleProduct);
        console.log(productlist);

        var str = JSON.stringify(productlist);
        localStorage.setItem('productData', str);

        clearForm();
        displayProducts(); //bt3d el array el gded ely bt3mlo push
    } else {
        alert('please try again');
    }

}
displayProducts();
// btgeb el data ely gowa el local storage

function clearForm() {
    nameInput.value = '';
    categoryInput.value = '';
    priceInput.value = '';
    descInput.value = '';
}


function displayProducts() {
    var str = '';
    for (var i = 0; i < productlist.length; i++) {
        str += `
        <td>${i}</td>
        <td>${productlist[i].productName}</td>
        <td>${productlist[i].productCategory}</td>
        <td>${productlist[i].productPrice}</td>
        <td>${productlist[i].productDesc}</td>
        <td>
            <button onclick='retriveProduct(${i})' class="btn btn-warning ">Update</button>
        </td>
        <td>
            <button onclick = 'deleteProduct(${i})'; class="btn btn-danger ">Delete</button>
        </td>

    </tr>`


    }
    tbody.innerHTML = str;
}

function searchProduct() {
    console.log(searchInput.value)
    var str = '';
    for (var i = 0; i < productlist.length; i++) {
        if (productlist[i].productName.includes(searchInput.value)) {
            str += `
            <td>${i}</td>
            <td>${productlist[i].productName}</td>
            <td>${productlist[i].productCategory}</td>
            <td>${productlist[i].productPrice}</td>
            <td>${productlist[i].productDesc}</td>
            <td>
                <button class="btn btn-warning ">Update</button>
            </td>
            <td>
                <button class="btn btn-danger ">Delete</button>
            </td>
    
        </tr>`

        }
    }
    tbody.innerHTML = str;
}


function validateProductName() {
    var regexNameInp = /^[A-Z][a-z0-9]{3,20}$/;
    // console.log(regexNameInp.test(nameInput.value));
    var isMatch = regexNameInp.test(nameInput.value);
    if (isMatch == true) {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add('is-valid');
        alertNameInp.classList.add('d-none')
        addBtn.removeAttribute('disabled');
        return true;
    } else {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid')
        alertNameInp.classList.remove('d-none')
        addBtn.setAttribute('disabled', 'true');
        return false;
    }
}
validateProductName();
nameInput.addEventListener("keyup", validateProductName);

function retriveProduct(ind) {
    console.log(productlist[ind]);
    nameInput.value = productlist[ind].productName;
    priceInput.value = productlist[ind].productPrice;
    categoryInput.value = productlist[ind].productCategory;
    descInput.value = productlist[ind].productDescription;
    addBtn.innerHTML = 'update Product';
    addBtn.onclick = function() {
        productlist[ind].productName = nameInput.value;
        productlist[ind].productPrice = priceInput.value;
        productlist[ind].productCategory = categoryInput.value;
        productlist[ind].productDescription = descInput.value;
        displayProducts();
        var str = JSON.stringify(productlist);
        localStorage.setItem('productData', str);
        addBtn.innerHTML = 'add Product';
        addBtn.onclick = addProduct
    }

}

function deleteProduct(ind) {

    productlist.splice(ind, 1);
    var str = JSON.stringify(productlist);
    localStorage.setItem('productData', str);
    displayProducts();
}