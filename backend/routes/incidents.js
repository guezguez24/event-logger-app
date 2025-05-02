import express from 'express';

const router = express.Router();

// Dummy in-memory incidents list (replace with DB queries if needed)
let incidents = [
  { id: 1, title: 'Server down', description: 'Main server is not responding', status: 'open' },
  { id: 2, title: 'API bug', description: 'API returns 500 on GET /users', status: 'in progress' }
];

// Get all incidents
router.get('/', (req, res) => {
  res.json(incidents);
});

// Create a new incident
router.post('/', (req, res) => {
  const { title, description, status } = req.body;
  const newIncident = {
    id: incidents.length + 1,
    title,
    description,
    status: status || 'open'
  };
  incidents.push(newIncident);
  res.status(201).json(newIncident);
});

// Get incident by ID
router.get('/:id', (req, res) => {
  const incident = incidents.find(i => i.id === parseInt(req.params.id));
  if (!incident) return res.status(404).json({ error: 'Incident not found' });
  res.json(incident);
});

// Update an incident
router.put('/:id', (req, res) => {
  const incident = incidents.find(i => i.id === parseInt(req.params.id));
  if (!incident) return res.status(404).json({ error: 'Incident not found' });

  const { title, description, status } = req.body;
  incident.title = title || incident.title;
  incident.description = description || incident.description;
  incident.status = status || incident.status;

  res.json(incident);
});

// Delete an incident
router.delete('/:id', (req, res) => {
  incidents = incidents.filter(i => i.id !== parseInt(req.params.id));
  res.status(204).end();
});

export default router;