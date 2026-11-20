// migrate.js
const mysql = require('mysql2');
const admin = require('firebase-admin');
const fs = require('fs');

// MySQL Connection
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'university_health'
});


// Initialize Firebase Admin
const serviceAccount = require('./service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

async function migrateTable(tableName, transformFunction) {
  return new Promise((resolve, reject) => {
    console.log(`Migrating ${tableName}...`);
    
    mysqlConnection.query(`SELECT * FROM ${tableName}`, async (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      let successCount = 0;
      let errorCount = 0;

      for (const row of results) {
        try {
          const firebaseData = transformFunction(row);
          await db.collection(tableName).doc(row.id?.toString() || generateId()).set({
            ...firebaseData,
            migratedAt: admin.firestore.FieldValue.serverTimestamp(),
            mysqlId: row.id // Keep original MySQL ID for reference
          });
          successCount++;
        } catch (err) {
          console.error(`Error migrating ${tableName} record ${row.id}:`, err);
          errorCount++;
        }
      }

      console.log(`✅ ${tableName}: ${successCount} successful, ${errorCount} failed`);
      resolve({ successCount, errorCount });
    });
  });
}

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Transformation functions for each table
const transformStudent = (student) => ({
  studentId: student.student_id,
  name: student.full_name || student.name,
  email: student.email,
  phone: student.phone_number || student.phone,
  dateOfBirth: student.date_of_birth ? new Date(student.date_of_birth) : null,
  gender: student.gender,
  bloodGroup: student.blood_group || student.blood_type,
  address: student.address,
  emergencyContact: {
    name: student.emergency_contact_name,
    phone: student.emergency_contact_phone,
    relationship: student.emergency_contact_relationship
  },
  allergies: student.allergies ? student.allergies.split(',') : [],
  medicalConditions: student.medical_conditions ? student.medical_conditions.split(',') : [],
  createdAt: student.created_at ? new Date(student.created_at) : admin.firestore.FieldValue.serverTimestamp(),
  isActive: student.is_active !== undefined ? student.is_active : true
});

const transformDoctor = (doctor) => ({
  doctorId: doctor.doctor_id,
  name: doctor.full_name || doctor.name,
  email: doctor.email,
  phone: doctor.phone_number || doctor.phone,
  specialization: doctor.specialization,
  department: doctor.department,
  licenseNumber: doctor.license_number,
  availability: doctor.availability ? JSON.parse(doctor.availability) : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  workingHours: {
    start: doctor.work_start_time || '09:00',
    end: doctor.work_end_time || '17:00'
  },
  maxPatientsPerDay: doctor.max_patients || 20,
  isActive: doctor.is_active !== undefined ? doctor.is_active : true,
  createdAt: doctor.created_at ? new Date(doctor.created_at) : admin.firestore.FieldValue.serverTimestamp()
});

const transformAppointment = (appointment) => ({
  appointmentId: appointment.appointment_id,
  studentId: appointment.student_id,
  studentName: appointment.student_name,
  doctorId: appointment.doctor_id,
  doctorName: appointment.doctor_name,
  date: appointment.appointment_date ? new Date(appointment.appointment_date) : null,
  time: appointment.appointment_time,
  reason: appointment.reason,
  status: appointment.status || 'scheduled',
  notes: appointment.notes || '',
  createdAt: appointment.created_at ? new Date(appointment.created_at) : admin.firestore.FieldValue.serverTimestamp()
});

const transformMedicine = (medicine) => ({
  medicineId: medicine.medicine_id,
  name: medicine.name,
  brand: medicine.brand,
  type: medicine.type,
  dosage: medicine.dosage,
  stock: medicine.stock_quantity || medicine.quantity,
  price: medicine.price,
  expiryDate: medicine.expiry_date ? new Date(medicine.expiry_date) : null,
  supplier: medicine.supplier,
  reorderLevel: medicine.reorder_level || 10,
  isActive: medicine.is_active !== undefined ? medicine.is_active : true,
  createdAt: medicine.created_at ? new Date(medicine.created_at) : admin.firestore.FieldValue.serverTimestamp()
});

// Run migration
async function runMigration() {
  try {
    console.log('Starting MySQL to Firebase migration...');
    
    await migrateTable('students', transformStudent);
    await migrateTable('doctors', transformDoctor);
    await migrateTable('appointments', transformAppointment);
    await migrateTable('medicines', transformMedicine);
    
    console.log('🎉 Migration completed successfully!');
    mysqlConnection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    mysqlConnection.end();
    process.exit(1);
  }
}

runMigration();