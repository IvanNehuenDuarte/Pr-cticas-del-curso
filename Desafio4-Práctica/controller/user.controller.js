let userService = require("../services/user.service");

class UserController{
    async GetAllProducts(req, res){
        await res.json(userService.GetAllProducts())
    }

    async GetUserById(req, res){
//Le indico que me muestre el producto con el id elegido en la req, entonces segun el id entra a los parametros y de los parametros al id.
        await res.json(userService.GetUserById(req.params.id));
    }

    async CreateProduct(req, res){
// Indicamos que tome el metodo de user.service y con el id que indice el usuario tome los datos que el usuario ponga en el body
        await res.json(userService.CreateProduct(req.body))
    }

// 
    async UpdateProductById(req, res){
        await res.json(userService.UpdateProductById(req.params.id, req.body))
    }

    async DeletProductById(req, res){
        await res.json(userService.DeleteProductById(req.params.id));
    }
}

module.exports = new UserController();