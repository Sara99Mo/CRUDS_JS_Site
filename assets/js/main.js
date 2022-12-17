//////////////////// submit active class to links ///////////////////
$(document).on('click' , '.last-news .links .new-link' , function(){
    $(this).submitClass('active').siblings().removeClass('active');
});

$(document).ready(function (){
    $('.new-link').click(function (){
       const value = $(this).attr('data-filter');
       if (value == 'all') {
          $('.new').show('1000');
       } else {
          $('.new').hide();
          $('.new.'+value).show('1000');
       }
    });
 });


//////////////////// submit Now Product ///////////////////

// 1- Variable 
let productElm = document.getElementById('product');
let submit = document.getElementById('submit');
let productF = document.getElementById('products');
let productShow = document.getElementById('product-show');
let count = document.getElementById('count');
let clearAll = document.getElementById('clear-all');
let errorMsg = document.getElementById('error');
/*let searchElm = document.getElementById('search');
let searchIcon = document.getElementById('search-icon');*/
let arr;
let mood = 'create';
let tmp;

if (localStorage.products) {
    arr = JSON.parse(localStorage.products);
} else {
    arr = [];
}

// 2- Create => Add the new product in local storage 
submit.onclick = function () {
    let obj = {product: productElm.value};
    if (productElm.value != '') {
        errorMsg.innerText = '';
        if (mood === 'create') {
            arr.push(obj);
        } else {
            arr[tmp] = obj;
            mood = 'create';
            submit.innerHTML = `<i class="fas fa-plus"></i>`;
        }
        localStorage.setItem('products' , JSON.stringify(arr));
        clearValue();
        showProducts();
    } else {
        let msg = "Plz, Enter product name..";
        errorMsg.innerText = msg;
    }
}

// 3- Show => show all products
function showProducts() {
    let product = '';
    if (arr.length > 0) {
        productShow.style.display = 'block';
        clearAll.style.display = 'block';
    } else {
        productShow.style.display = 'none';
        clearAll.style.display = 'none';
    }
    arr.map((pro , id) => {
        product += `
            <div class="product">
                <p>${pro.product}</p>
                <div>
                    <button class="edit" onclick="editProduct(${id})"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteProduct(${id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    });
    count.innerText = arr.length;
    productShow.innerHTML = product;
}

// 4- Edit => edit the product data
function editProduct(pro) {
    productElm.value = arr[pro].product;
    mood = 'update';
    submit.innerHTML = `<i class="fas fa-edit"></i>`;
    tmp = pro;
    scroll ({
        top: 0,
        behavior: "smooth",
    })
}

// 5- Delete => remove product
function deleteProduct(pro) {
    arr.splice(pro,1);
    localStorage.products = JSON.stringify(arr);
    showProducts();
}

// 6- Clear All => Remove all products from local storage
clearAll.onclick = function() {
    let confMsg = "Are you sure! You need delete all products?!";
    if (confirm(confMsg)) {
        arr.splice(0);
        localStorage.clear();
        productShow.style.display = 'none';
        showProducts();
    }
}

// 7- Clear => remove input's value
function clearValue() {
    productElm.value = '';
}

// 8- Search => search in the products
function searchData(val) {
    val = val.toLowerCase();
    let product = '';
    arr.map((pro , id) => {
        if(pro.product.toLowerCase().includes(val)) {
            product += `
                <div class="product">
                    <p>${pro.product}</p>
                    <div>
                        <button class="edit" onclick="editProduct(${id})"><i class="fas fa-edit"></i></button>
                        <button onclick="deleteProduct(${id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        }
    })
    if (product == '') {
        product = 'Not Have Data much this name!';
    }
    productShow.innerHTML = product;
}

showProducts();
