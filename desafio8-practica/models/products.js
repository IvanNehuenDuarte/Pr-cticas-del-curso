const bd = require("./../db");


// Todos los productos y por ID
const productos = (params = {}) => {
  return bd("productos")
  .where(params)
  .select(
    "product_id",
    "product_name",
    "product_price",
    "product_img",
    "product_stock"
  );
};


// Crear productos 
const crear = (obj) => bd("productos").insert(obj);

// Actualizar productos 
const update = (params, obj) => bd("productos").where(params).update(obj);

// Eliminar productos 
const remove = (params, obj) => bd("productos").where(params).del(obj);

module.exports = { productos, crear, update, remove};
