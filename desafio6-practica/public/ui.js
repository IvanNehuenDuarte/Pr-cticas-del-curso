const productsList = document.querySelector('#products');

const appendProduct = products =>{
    productsList.innerHTML += `
    <div class="card card-body rounded-0 mb-2">
        <div class="d-flex justify-content-between">
            <h1 class="h3 card-title" style="color: black;"><b>Nombre: </b>${products.title}</h1>
            <div>
                <img class="card-img-right" src=${products.img} width="70px" height="70px" style="float: right;"/>
            </div>
        </div>

        <p style="color: black;"><b>Precio: </b>${products.price}</p>
    </div>`
}

const loadProducts = (products) => {
    products.forEach((product) => appendProduct(product));
};