const express = require('express');
const router = express.Router();
const Transfer = require('../models/Transfer');

// Get incoming transfers
router.get('/incoming', async (req, res) => {
  try {
    const incomingTransfers = await Transfer.find({ status: 'pending', destination: 'depot' });
    res.json(incomingTransfers);
  } catch (error) {
    console.error('Error fetching incoming transfers:', error);
    res.status(500).json({ message: 'Error fetching incoming transfers' });
  }
});

// Get outgoing transfers
router.get('/outgoing', async (req, res) => {
  try {
    const outgoingTransfers = await Transfer.find({ status: 'pending', source: 'depot' });
    res.json(outgoingTransfers);
  } catch (error) {
    console.error('Error fetching outgoing transfers:', error);
    res.status(500).json({ message: 'Error fetching outgoing transfers' });
  }
});

// Send transfer
router.post('/send', async (req, res) => {
  const { products, source, destination } = req.body;
  const transfer = new Transfer({
    products,
    source,
    destination,
    status: 'outgoing'
  });

  try {
    const newTransfer = await transfer.save();
    res.status(201).json(newTransfer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Accept incoming transfer
router.post('/accept', async (req, res) => {
  const { id } = req.body;

  try {
    const transfer = await Transfer.findById(id);
    if (!transfer) {
      return res.status(404).json({ message: 'Transfer not found' });
    }

    transfer.status = 'accepted';
    await transfer.save();

    res.json({ message: 'Transfer accepted successfully', transfer });
  } catch (error) {
    console.error('Error accepting transfer:', error);
    res.status(500).json({ message: 'Error accepting transfer' });
  }
});

// Report missing products
router.post('/missing', async (req, res) => {
  const { products } = req.body;
  try {
    res.status(200).json({ message: 'Missing products reported' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
