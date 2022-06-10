//*------------- Lado del cliente ----------------

const productForm = document.querySelector('#productForm')
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const img = document.querySelector('#img');

productForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    saveProduct(title.value, price.value, img.value);

});

