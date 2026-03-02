
import { config } from "dotenv";
import { pool } from "../config/db.js";
import fs from "fs"
import csv from "csv-parser"

config()





export const migrateCSV = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const rows = [];

    //  Leer CSV
    await new Promise((resolve, reject) => {
      fs.createReadStream('datosPrueba.csv')
        .pipe(csv())
        .on("data", (data) => rows.push(data))
        .on("end", resolve)
        .on("error", reject);
    });
 
    //  Iterar filas
    for (const row of rows) {

      // SPECIALTY
      const specialtyRes = await client.query(
        `INSERT INTO specialty (specialty_name)
         VALUES ($1) 
         ON CONFLICT (specialty_name)
         DO UPDATE SET specialty_name = EXCLUDED.specialty_name
         RETURNING specialty_id`,
        [row.specialty]
      );

      const specialty_id = specialtyRes.rows[0].specialty_id;

      // INSURANCE
      const insuranceRes = await client.query(
        `INSERT INTO insurance_provider (insurance_name, coverage_percentage)
         VALUES ($1, $2)
         ON CONFLICT (insurance_name)
         DO UPDATE SET coverage_percentage = EXCLUDED.coverage_percentage
         RETURNING insurance_id`,
        [row.insurance_provider, row.coverage_percentage]
      );

      const insurance_id = insuranceRes.rows[0].insurance_id;

      // TREATMENT
      const treatmentRes = await client.query(
        `INSERT INTO treatment (treatment_code, treatment_name, treatment_cost)
         VALUES ($1, $2, $3)
         ON CONFLICT (treatment_code)
         DO UPDATE SET treatment_name = EXCLUDED.treatment_name
         RETURNING treatment_id`,
        [
          row.treatment_code,
          row.treatment_description,
          row.treatment_cost
        ]
      );

      const treatment_id = treatmentRes.rows[0].treatment_id;

      // DOCTOR
      const doctorRes = await client.query(
        `INSERT INTO doctor (doctor_name, doctor_email, specialty_id)
         VALUES ($1, $2, $3)
         ON CONFLICT (doctor_email)
         DO UPDATE SET doctor_name = EXCLUDED.doctor_name
         RETURNING doctor_id`,
        [
          row.doctor_name,
          row.doctor_email,
          specialty_id
        ]
      );

      const doctor_id = doctorRes.rows[0].doctor_id;

      // PATIENT
      const patientRes = await client.query(
        `INSERT INTO patient
         (patient_name, patient_email, patient_phone, patient_address, insurance_id)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (patient_email)
         DO UPDATE SET patient_name = EXCLUDED.patient_name
         RETURNING patient_id`,
        [
          row.patient_name,
          row.patient_email,
          row.patient_phone,
          row.patient_address,
          insurance_id
        ]
      );

      const patient_id = patientRes.rows[0].patient_id;

      // APPOINTMENT 
      await client.query(
        `INSERT INTO appointment
         (appointment_code,appointment_date, patient_id, doctor_id, treatment_id, amount_paid)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          row.appointment_id,
          row.appointment_date,
          patient_id,
          doctor_id,
          treatment_id,
          row.amount_paid
        ]
      );
    }

    await client.query("COMMIT");
    console.log("✅ Migración completada");

  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Error en migración:", error.message);
  } finally {
    client.release();
  }
};
