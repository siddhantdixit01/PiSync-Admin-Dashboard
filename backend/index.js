const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const date = Date.now();
const statuses = ["Success", "Pending", "Failed"];
// let devices = Array.from({ length: 100 }, (_, i) => ({
//   id: `device-${i + 1}`,
//   lastSyncTime: new Date (date - Math.random() * 100000000).toISOString(),
//   status: statuses[Math.floor(Math.random() * 3)],
// }));
const formatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: 'UTC',
});

let devices = Array.from({ length: 100 }, (_, i) => {
  const rawDate = new Date(date - Math.random() * 100000000);
  return {
    id: `device-${i + 1}`,
    lastSyncTime: formatter.format(rawDate),
    status: statuses[Math.floor(Math.random() * 3)],
  };
});

let errorLogs = devices
  .filter(d => d.status === "Failed")
  .map(d => ({
    deviceId: d.id,
    error: "Network timeout",
    time: d.lastSyncTime,
  }));

// Get paginated devices
app.get("/devices", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const paginatedDevices = devices.slice(start, start + limit);
  res.json({
    data: paginatedDevices,
    total: devices.length,
    page,
    limit,
  });
});

// Trigger sync
app.post("/sync/:id", (req, res) => {
  res.json({ message: `Sync triggered for ${req.params.id}` });
});

// Error logs
app.get("/errors", (req, res) => {
  res.json({ data: errorLogs });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
