// backend/pages/api/location.js
const express = require('express');
const router = express.Router();

// Mock database - Yahan tumhara actual database integration hoga
const locationData = {
  store: {
    name: "MediStore",
    tagline: "Your Trusted Online Pharmacy",
    manager: "Mr. Sidsir (Irshad Ahmad)",
    phone: "+91 7355534404",
    email: "irshad1554@gmail.com",
    address: "40 Futta Road, Shaheen Bagh, New Delhi - 110025",
    hours: "8:00 AM – 7:00 PM (Monday – Saturday)",
    deliveryArea: "Delhi & NCR region",
    rating: 4.8,
    totalReviews: 1247,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500",
    establishedYear: "2018",
    licenseNumber: "DL-234567",
    gstNumber: "07AABCU9603R1ZZ"
  },
  services: [
    { 
      icon: "💊", 
      name: "Medicines", 
      description: "Prescription & OTC drugs", 
      available: true,
      count: 5000
    },
    { 
      icon: "🏥", 
      name: "Healthcare", 
      description: "Medical equipment & supplies", 
      available: true,
      count: 800
    },
    { 
      icon: "🚚", 
      name: "Fast Delivery", 
      description: "Same day delivery available", 
      available: true,
      deliveryTime: "1-2 hours"
    },
    { 
      icon: "💯", 
      name: "Authentic", 
      description: "100% genuine products", 
      available: true,
      certification: "ISO 9001:2015"
    },
    { 
      icon: "🔒", 
      name: "Secure", 
      description: "Safe & secure transactions", 
      available: true,
      encryption: "256-bit SSL"
    },
    { 
      icon: "📞", 
      name: "24/7 Support", 
      description: "Round the clock assistance", 
      available: true,
      responseTime: "< 5 minutes"
    }
  ],
  branches: [
    {
      id: 1,
      name: "Shaheen Bagh Main Store",
      address: "40 Futta Road, Shaheen Bagh, New Delhi - 110025",
      phone: "+91 7355534404",
      email: "main@medistore.com",
      isMain: true,
      distance: "0 km",
      status: "Open",
      coordinates: { lat: 28.5562, lng: 77.2853 },
      manager: "Mr. Sidsir (Irshad Ahmad)",
      openingHours: "8:00 AM – 7:00 PM",
      facilities: ["Parking", "Home Delivery", "Online Consultation"]
    },
    {
      id: 2,
      name: "Okhla Branch", 
      address: "Near Metro Station, Okhla, New Delhi - 110020",
      phone: "+91 7355534405",
      email: "okhla@medistore.com",
      isMain: false,
      distance: "3.2 km",
      status: "Open",
      coordinates: { lat: 28.5355, lng: 77.2644 },
      manager: "Ms. Priya Sharma",
      openingHours: "9:00 AM – 8:00 PM",
      facilities: ["Home Delivery", "Online Consultation"]
    },
    {
      id: 3,
      name: "Jamia Nagar Branch",
      address: "Main Market, Jamia Nagar, New Delhi - 110025",
      phone: "+91 7355534406",
      email: "jamia@medistore.com",
      isMain: false,
      distance: "2.8 km",
      status: "Closed",
      coordinates: { lat: 28.5595, lng: 77.2826 },
      manager: "Mr. Ahmed Khan",
      openingHours: "8:30 AM – 6:30 PM",
      facilities: ["Parking", "Home Delivery"]
    },
    {
      id: 4,
      name: "Kalindi Kunj Branch",
      address: "Kalindi Kunj Road, New Delhi - 110025",
      phone: "+91 7355534407",
      email: "kalindi@medistore.com",
      isMain: false,
      distance: "4.1 km",
      status: "Open",
      coordinates: { lat: 28.5501, lng: 77.3021 },
      manager: "Dr. Rajesh Kumar",
      openingHours: "8:00 AM – 9:00 PM",
      facilities: ["Parking", "Home Delivery", "Online Consultation", "Lab Tests"]
    }
  ],
  statistics: {
    totalCustomers: 50000,
    totalOrders: 125000,
    averageDeliveryTime: "45 minutes",
    satisfactionRate: 4.8,
    yearsOfService: 6
  }
};

// GET /api/location - Main location data
router.get('/', (req, res) => {
  try {
    // Simulate database query delay
    setTimeout(() => {
      res.json({
        success: true,
        data: locationData,
        timestamp: new Date().toISOString()
      });
    }, 500); // 500ms delay for realistic loading

  } catch (error) {
    console.error('Location API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// GET /api/location/branches - Only branches data
router.get('/branches', (req, res) => {
  try {
    res.json({
      success: true,
      data: locationData.branches,
      total: locationData.branches.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch branches'
    });
  }
});

// GET /api/location/services - Only services data
router.get('/services', (req, res) => {
  try {
    res.json({
      success: true,
      data: locationData.services,
      total: locationData.services.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services'
    });
  }
});

// GET /api/location/branch/:id - Specific branch details
router.get('/branch/:id', (req, res) => {
  try {
    const branchId = parseInt(req.params.id);
    const branch = locationData.branches.find(b => b.id === branchId);
    
    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found'
      });
    }

    res.json({
      success: true,
      data: branch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch branch details'
    });
  }
});

// POST /api/location/contact - Contact form submission
router.post('/contact', (req, res) => {
  try {
    const { name, email, phone, message, branchId } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required'
      });
    }

    // Here you would typically save to database
    console.log('Contact form submission:', {
      name,
      email, 
      phone,
      message,
      branchId,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      ticketId: `TKT${Date.now()}`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form'
    });
  }
});

module.exports = router;