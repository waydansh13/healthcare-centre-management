const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('express').json;

dotenv.config();

const app = express();
app.use(bodyParser());

// Basic health route
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'healthcare-backend' });
});

// Mount routes (placeholders)
const routeFiles = [
  'admin.routes', 'appointment.routes', 'billing.routes', 'department.routes',
  'disease.routes', 'doctor.routes', 'lab.routes', 'labreport.routes', 'medicalrecord.routes',
  'medicine.routes', 'patient.routes', 'pharmacy.routes', 'prescription.routes', 'surgery.routes'
];

routeFiles.forEach(rf => {
  try {
    const router = require(`./routes/${rf}`);
    app.use('/api', router);
  } catch (err) {
    // route file may not exist yet — ignore
  }
});

module.exports = app;
