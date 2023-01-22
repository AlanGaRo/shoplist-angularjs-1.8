let app = angular.module("app", ["ngRoute"]);

// configuracion de rutas
app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    templateUrl: "carrito.html",
    controller: "controlador"
  })
  .when("/productos", {
    templateUrl: "productos.html",
    controller: "controlador"
  })
});

//controlador principal de la aplicacion
app.controller("controlador", function($scope){
  let lista = this;
  let n = 2;
  let nCarrito = 1;

  // lista de productos inicial
  lista.productos = [
    {id: 1, nombre: "Agua", precio: 20.0},
    {id: 2, nombre: "Café", precio: 10.0}
  ];

  lista.carrito = [];

  // agregar el producto al catalogo de productos
  lista.addProducto = function(){
    let nombre = lista.nombre;
    let precio = lista.precio;

    if(nombre != "" && precio != "" && !isNaN(precio)){
      n++;
      lista.productos.push({id: n, nombre: nombre, precio: precio});

      lista.nombre = "";
      lista.precio = "";
    }
  }

  // agregar un producto al carrito
  lista.addAlCarrito = function() {
    let id = lista.productoSeleccionado;
    let cantidad = lista.cantidad;
    let producto = lista.productos.find(function(obj){
      return obj.id == id;
    });

    if(producto != undefined && cantidad > 0){
      lista.carrito.push({id: nCarrito, nombre: producto.nombre, precio: producto.precio, cantidad: cantidad, total: producto.precio * cantidad })
      nCarrito++;
      lista.productoSeleccionado = "";
      lista.cantidad = "";
    }else{
      console.log('ocurrio un error')
    }
  }

  // obtener el total de los productos en el carrito
  lista.getTotalCarrito = function(){
    let total = 0;
    lista.carrito.forEach(x => {
      total += x.total;
    });

    return total;
  }

  // eliminar producto del carrito
  lista.deleteOfCarrito = function(id) {
    console.log(id)
    let index = lista.carrito.findIndex(x => x.id === id)
    console.log(index)
    lista.carrito.splice(index, 1);
  }
});