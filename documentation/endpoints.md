
create tables: POST http://localhost:3000/api/tables/create
migrate SQL: POST http://localhost:3000/api/tables/migrate
clear SQL: POST http://localhost:3000/api/tables/clearTables
migrate Mongo: POST http://localhost:3000/api/mongo/migrate

Suppliers get All: GET http://localhost:3000/api/suppliers/get

Supplier by email: GET http://localhost:3000/api/suppliers/get/:email  (contacto@hogarpro.com)


supplier Add: POST http://localhost:3000/api/suppliers/add


 {
    "supplier_email": "prueba@correo.com",
    "supplier_name": "prueba"
}

supplier Delete: DELETE http://localhost:3000/api/suppliers/delete/:id

supplier Update: PUT http://localhost:3000/api/suppliers/update/:id"

 {
    "supplier_name": "elcambio",
    "supplier_email": "nuevo@email.com"
 }