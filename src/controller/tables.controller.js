import { createTables, deleteTables } from "../services/createTables.js";
import { migrateCSV } from "../services/migrateSQL.js";
import { migrateToMongoDB } from "../services/migrateMongo.js";


//------SQL------------------------------------------------------
export const createTablesEndpoint = async (req,res) =>{
    try {

    await createTables();
    

    res.status(200).json({
      message: "Success creating tables",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error creating tables"
    });
  }
}

export const migrateTablesEndpoint = async (req, res) =>{

    try {
        
        await migrateCSV();

        res.status(200).json({
            message: "Succes migrating data"
        })

    } 
    catch (error) {

        console.error(error)
        res.status(500).json({
            error: "Error migrating data"
        })
        
    }
}

export const deleteTablesEndpoint = async (req,res) =>{
    try {

    await deleteTables();
    

    res.status(200).json({
      message: "Success deleting tables",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error deleting tables"
    });
  }
}

//---------Mongo-----------------------------------

export const migrateEndpointMongo = async (req, res) => {
  try {
    const counter = await migrateToMongoDB();

    res.status(200).json({
      message: "Migración MongoDB exitosa",
      counter
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error en migración MongoDB"
    });
  }
};
