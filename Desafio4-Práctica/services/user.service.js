const productData = require("../db/productos.json");

class UserService{
    GetAllProducts(){
        return productData;
    }

    //GetIndex lo creo para así en cualquier metodo que nececite el id solo llamo a este metodo
    GetIndex(id){
// Le digo que retorne el indice que está en user data, para eso indico un paramero data el cual retorna el id
        return productData.findIndex((data)=>{ return data.id.toString() === id.toString()});
    }

//Declaro variable index que tiene todos los id que retornó el metodo GetIndex y retorno el producto con ese id
    GetUserById(id){
        let index = this.GetIndex(id);
        return productData[index];
    }

// Pusheo el nuevo producto que voy a crear en user.controller
    CreateProduct(data){
        productData.push(data);
        return "Producto creado correctamente"
    }

// 
    UpdateProductById(id, data){
        let index = this.GetIndex(id);

        productData[index].id = data.id;
        productData[index].Titulo = data.Titulo;
        productData[index].Precio = data.Precio;

        return "Producto Actualizado"
    }

    DeleteProductById(id){
        let index = this.GetIndex(id);
        productData.splice(index, 1);
        return "Producto eliminado"
    }
}

module.exports = new UserService()