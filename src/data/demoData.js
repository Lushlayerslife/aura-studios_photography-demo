export const studioStats = {
  monthlyRevenue: 47850,
  totalSessions: 284,
  activeClients: 127,
  galleriesDelivered: 198,
  avgSessionValue: 1250,
  bookingRate: 94,
  clientRetention: 88,
  teamUtilization: 76
};

export const recentSessions = [
  { id: 'LS-1001', client: 'Olivia & James Bennett', type: 'Wedding', date: '2026-02-14', time: '2:00 PM', photographer: 'Maya Chen', location: 'Barton Creek Greenbelt', status: 'Booked', package: 'Luxe Wedding Collection', value: 4800 },
  { id: 'LS-1002', client: 'The Patel Family', type: 'Family Portrait', date: '2026-02-10', time: '10:00 AM', photographer: 'Ethan Ruiz', location: 'Zilker Botanical Garden', status: 'Prep Sent', package: 'Family Signature Session', value: 650 },
  { id: 'LS-1003', client: 'Harper & Co Boutique', type: 'Commercial', date: '2026-02-08', time: '9:00 AM', photographer: 'Maya Chen', location: 'Client Studio - 2nd Street', status: 'Shot', package: 'Brand Story Package', value: 3200 },
  { id: 'LS-1004', client: 'Daniela Reyes', type: 'Headshot', date: '2026-02-06', time: '3:30 PM', photographer: 'Sofia Nakamura', location: 'Luminance Main Studio', status: 'Editing', package: 'Professional Headshot', value: 450 },
  { id: 'LS-1005', client: 'Marcus & Tanya Green', type: 'Engagement', date: '2026-02-03', time: '5:00 PM', photographer: 'Ethan Ruiz', location: 'Mount Bonnell', status: 'Delivered', package: 'Couples Session', value: 850 },
  { id: 'LS-1006', client: 'Bloom Floral Design', type: 'Product', date: '2026-02-01', time: '11:00 AM', photographer: 'Maya Chen', location: 'Luminance Main Studio', status: 'Review Requested', package: 'Product Catalog Shoot', value: 2100 },
  { id: 'LS-1007', client: 'Baby Eloise Carter', type: 'Newborn', date: '2026-01-28', time: '9:30 AM', photographer: 'Sofia Nakamura', location: 'Luminance Main Studio', status: 'Delivered', package: 'Newborn Signature', value: 750 },
  { id: 'LS-1008', client: 'Austin Tech Summit', type: 'Event', date: '2026-02-20', time: '8:00 AM', photographer: 'Ethan Ruiz', location: 'Austin Convention Center', status: 'Booked', package: 'Full Day Event Coverage', value: 5500 }
];

export const clients = [
  { id: 'C-001', name: 'Olivia & James Bennett', email: 'olivia.bennett@email.com', phone: '(512) 555-0142', sessions: 3, totalSpent: 9600, lastSession: '2026-02-14', status: 'Active', type: 'Wedding', notes: 'Referred by Bloom Floral. February wedding at Barton Creek.' },
  { id: 'C-002', name: 'The Patel Family', email: 'priya.patel@email.com', phone: '(512) 555-0287', sessions: 5, totalSpent: 3200, lastSession: '2026-02-10', status: 'Active', type: 'Family', notes: 'Annual family portraits. 2 kids, dog friendly shoots.' },
  { id: 'C-003', name: 'Harper & Co Boutique', email: 'hello@harperco.com', phone: '(512) 555-0391', sessions: 8, totalSpent: 18400, lastSession: '2026-02-08', status: 'Active', type: 'Commercial', notes: 'Quarterly product shoots and seasonal campaigns.' },
  { id: 'C-004', name: 'Daniela Reyes', email: 'daniela.reyes@email.com', phone: '(512) 555-0455', sessions: 1, totalSpent: 450, lastSession: '2026-02-06', status: 'Active', type: 'Headshot', notes: 'Corporate headshot for new role at Dell Technologies.' },
  { id: 'C-005', name: 'Marcus & Tanya Green', email: 'marcus.green@email.com', phone: '(512) 555-0523', sessions: 2, totalSpent: 1700, lastSession: '2026-02-03', status: 'Active', type: 'Engagement', notes: 'Engagement + wedding booked. Wedding June 2026.' },
  { id: 'C-006', name: 'Bloom Floral Design', email: 'studio@bloomfloral.com', phone: '(512) 555-0678', sessions: 12, totalSpent: 24600, lastSession: '2026-02-01', status: 'VIP', type: 'Commercial', notes: 'Long-term brand partner. Monthly product shoots + social content.' },
  { id: 'C-007', name: 'The Carter Family', email: 'sarah.carter@email.com', phone: '(512) 555-0734', sessions: 4, totalSpent: 2800, lastSession: '2026-01-28', status: 'Active', type: 'Newborn', notes: 'Newborn, milestone sessions. Expecting second child Aug 2026.' },
  { id: 'C-008', name: 'Austin Tech Summit', email: 'events@austintechsummit.com', phone: '(512) 555-0890', sessions: 2, totalSpent: 11000, lastSession: '2026-02-20', status: 'Corporate', type: 'Event', notes: 'Annual conference. 2-day coverage, speaker headshots, B-roll.' },
  { id: 'C-009', name: 'Luna Aesthetic Spa', email: 'marketing@lunaspa.com', phone: '(512) 555-0912', sessions: 6, totalSpent: 8400, lastSession: '2026-01-22', status: 'Active', type: 'Commercial', notes: 'Bi-monthly brand content. Interior + service photography.' },
  { id: 'C-010', name: 'Chef Marco Rossi', email: 'marco@rossiaustin.com', phone: '(512) 555-1045', sessions: 3, totalSpent: 4500, lastSession: '2026-01-15', status: 'Active', type: 'Commercial', notes: 'Restaurant menu + interior. James Beard nominee.' }
];

export const galleries = [
  {
    id: 'G-001', client: 'Marcus & Tanya Green', session: 'Engagement', imageCount: 85, status: 'Delivered',
    deliveredDate: '2026-02-05', expiresDate: '2026-03-07',
    link: 'https://galleries.luminancestudios.com/green-engagement', selections: 32, downloads: 28,
    thumbnails: [
      'https://static.wixstatic.com/media/11062b_94f7f9cce5ec44a88626bfb72456e7ed~mv2.jpeg/v1/fit/w_480,h_320/11062b_94f7f9cce5ec44a88626bfb72456e7ed~mv2.jpeg',
      'https://static.wixstatic.com/media/f15b931ba8324675b9fe58de36a29477.jpg/v1/fit/w_480,h_320/f15b931ba8324675b9fe58de36a29477.jpg',
      'https://static.wixstatic.com/media/11062b_e08a5bcd8ec74e98afdd2f51fba3f35a~mv2.jpg/v1/fit/w_480,h_320/11062b_e08a5bcd8ec74e98afdd2f51fba3f35a~mv2.jpg'
    ]
  },
  {
    id: 'G-002', client: 'Baby Eloise Carter', session: 'Newborn', imageCount: 120, status: 'Delivered',
    deliveredDate: '2026-01-30', expiresDate: '2026-03-01',
    link: 'https://galleries.luminancestudios.com/carter-newborn', selections: 45, downloads: 45,
    thumbnails: [
      'https://static.wixstatic.com/media/36a890558baa778dce7b6cbc6b746d5a.jpg/v1/fit/w_480,h_320/36a890558baa778dce7b6cbc6b746d5a.jpg',
      'https://static.wixstatic.com/media/f927258c4fb14e9596409b60218ef992.jpg/v1/fit/w_480,h_320/f927258c4fb14e9596409b60218ef992.jpg',
      'https://static.wixstatic.com/media/bd464f9e6768092cfb2709c98ba23ac9.jpg/v1/fit/w_480,h_320/bd464f9e6768092cfb2709c98ba23ac9.jpg'
    ]
  },
  {
    id: 'G-003', client: 'Bloom Floral Design', session: 'Product Catalog', imageCount: 200, status: 'Review Requested',
    deliveredDate: '2026-02-03', expiresDate: '2026-03-05',
    link: 'https://galleries.luminancestudios.com/bloom-feb', selections: 0, downloads: 0,
    thumbnails: [
      'https://static.wixstatic.com/media/14032b9f91d34a688e3f6e12f5feeb57.jpg/v1/fit/w_480,h_320/14032b9f91d34a688e3f6e12f5feeb57.jpg',
      'https://static.wixstatic.com/media/11062b_0cbcf7f20ff54d609ff9cb52ba2bbac6~mv2.jpeg/v1/fit/w_480,h_320/11062b_0cbcf7f20ff54d609ff9cb52ba2bbac6~mv2.jpeg',
      'https://static.wixstatic.com/media/11062b_95281bc9993c4e3481d93b4867e07886~mv2.jpeg/v1/fit/w_480,h_320/11062b_95281bc9993c4e3481d93b4867e07886~mv2.jpeg'
    ]
  },
  {
    id: 'G-004', client: 'Harper & Co Boutique', session: 'Spring Campaign', imageCount: 150, status: 'Editing',
    deliveredDate: null, expiresDate: null, link: null, selections: 0, downloads: 0,
    thumbnails: [
      'https://static.wixstatic.com/media/11062b_da1de485c4d84e28a045751ca65fa0bc~mv2.jpeg/v1/fit/w_480,h_320/11062b_da1de485c4d84e28a045751ca65fa0bc~mv2.jpeg',
      'https://static.wixstatic.com/media/11062b_fa5d44a3c4304767bbc85a097373a572~mv2.jpeg/v1/fit/w_480,h_320/11062b_fa5d44a3c4304767bbc85a097373a572~mv2.jpeg',
      'https://static.wixstatic.com/media/11062b_fde9fa6b19d74291bd2df359da0545f5~mv2.jpeg/v1/fit/w_480,h_320/11062b_fde9fa6b19d74291bd2df359da0545f5~mv2.jpeg'
    ]
  },
  {
    id: 'G-005', client: 'Luna Aesthetic Spa', session: 'Brand Content', imageCount: 95, status: 'Delivered',
    deliveredDate: '2026-01-25', expiresDate: '2026-02-24',
    link: 'https://galleries.luminancestudios.com/luna-jan', selections: 60, downloads: 55,
    thumbnails: [
      'https://static.wixstatic.com/media/11062b_19aa0055bb954520aaf9b1eb1ac08c76~mv2.jpeg/v1/fit/w_480,h_320/11062b_19aa0055bb954520aaf9b1eb1ac08c76~mv2.jpeg',
      'https://static.wixstatic.com/media/d271d28f2fcc1376aa3c437934a620d3.jpg/v1/fit/w_480,h_320/d271d28f2fcc1376aa3c437934a620d3.jpg',
      'https://static.wixstatic.com/media/476a36e90af415d350e6a114bb37ddf8.jpg/v1/fit/w_480,h_320/476a36e90af415d350e6a114bb37ddf8.jpg'
    ]
  },
  {
    id: 'G-006', client: 'Daniela Reyes', session: 'Headshot', imageCount: 40, status: 'Editing',
    deliveredDate: null, expiresDate: null, link: null, selections: 0, downloads: 0,
    thumbnails: [
      'https://static.wixstatic.com/media/dca06cb984864003a90721e277c0483f.jpg/v1/fit/w_480,h_320/dca06cb984864003a90721e277c0483f.jpg',
      'https://static.wixstatic.com/media/11062b_db5493e52e5c4a5a9b173c1f6bb8e578~mv2.jpg/v1/fit/w_480,h_320/11062b_db5493e52e5c4a5a9b173c1f6bb8e578~mv2.jpg',
      'https://static.wixstatic.com/media/11062b_bb0b694bfa844dda8661c5b87ef7df0b~mv2.jpg/v1/fit/w_480,h_320/11062b_bb0b694bfa844dda8661c5b87ef7df0b~mv2.jpg'
    ]
  }
];

export const invoices = [
  { id: 'INV-2001', client: 'Olivia & James Bennett', amount: 4800, paid: 2400, status: 'Partial', date: '2026-01-15', due: '2026-02-14', package: 'Luxe Wedding Collection', method: 'Stripe', installments: '2 of 3' },
  { id: 'INV-2002', client: 'The Patel Family', amount: 650, paid: 650, status: 'Paid', date: '2026-02-08', due: '2026-02-08', package: 'Family Signature Session', method: 'Stripe', installments: null },
  { id: 'INV-2003', client: 'Harper & Co Boutique', amount: 3200, paid: 3200, status: 'Paid', date: '2026-02-01', due: '2026-02-15', package: 'Brand Story Package', method: 'Bank Transfer', installments: null },
  { id: 'INV-2004', client: 'Daniela Reyes', amount: 450, paid: 450, status: 'Paid', date: '2026-02-06', due: '2026-02-06', package: 'Professional Headshot', method: 'Stripe', installments: null },
  { id: 'INV-2005', client: 'Marcus & Tanya Green', amount: 850, paid: 850, status: 'Paid', date: '2026-01-30', due: '2026-02-03', package: 'Couples Session', method: 'Stripe', installments: null },
  { id: 'INV-2006', client: 'Bloom Floral Design', amount: 2100, paid: 0, status: 'Pending', date: '2026-02-03', due: '2026-02-17', package: 'Product Catalog Shoot', method: 'Net 30', installments: null },
  { id: 'INV-2007', client: 'Austin Tech Summit', amount: 5500, paid: 2750, status: 'Partial', date: '2026-02-01', due: '2026-02-20', package: 'Full Day Event Coverage', method: 'Stripe', installments: '1 of 2' },
  { id: 'INV-2008', client: 'Luna Aesthetic Spa', amount: 1400, paid: 1400, status: 'Paid', date: '2026-01-20', due: '2026-01-30', package: 'Brand Content Package', method: 'Stripe', installments: null }
];

export const templates = [
  { id: 'T-001', name: 'Welcome Email', category: 'Client Onboarding', type: 'Email', status: 'Active', lastUsed: '2026-02-06', usageCount: 84 },
  { id: 'T-002', name: 'Session Prep Guide', category: 'Client Onboarding', type: 'Email', status: 'Active', lastUsed: '2026-02-08', usageCount: 67 },
  { id: 'T-003', name: 'Pre-Session Questionnaire', category: 'Client Onboarding', type: 'Form', status: 'Active', lastUsed: '2026-02-07', usageCount: 71 },
  { id: 'T-004', name: '48-Hour Reminder', category: 'Session Prep', type: 'Email', status: 'Active', lastUsed: '2026-02-09', usageCount: 92 },
  { id: 'T-005', name: 'Shot List - Wedding', category: 'Session Prep', type: 'Checklist', status: 'Active', lastUsed: '2026-01-28', usageCount: 23 },
  { id: 'T-006', name: 'Shot List - Portrait', category: 'Session Prep', type: 'Checklist', status: 'Active', lastUsed: '2026-02-06', usageCount: 45 },
  { id: 'T-007', name: 'Editing Status Update', category: 'Post-Session', type: 'Email', status: 'Active', lastUsed: '2026-02-05', usageCount: 58 },
  { id: 'T-008', name: 'Gallery Delivery', category: 'Post-Session', type: 'Email', status: 'Active', lastUsed: '2026-02-05', usageCount: 76 },
  { id: 'T-009', name: 'Review Request', category: 'Post-Session', type: 'Email', status: 'Active', lastUsed: '2026-02-03', usageCount: 49 },
  { id: 'T-010', name: 'Standard Photography Contract', category: 'Legal', type: 'Contract', status: 'Active', lastUsed: '2026-02-01', usageCount: 38 },
  { id: 'T-011', name: 'Model Release Form', category: 'Legal', type: 'Contract', status: 'Active', lastUsed: '2026-01-28', usageCount: 31 },
  { id: 'T-012', name: 'Wedding Contract', category: 'Legal', type: 'Contract', status: 'Active', lastUsed: '2026-01-15', usageCount: 12 },
  { id: 'T-013', name: 'Payment Plan Agreement', category: 'Finance', type: 'Document', status: 'Active', lastUsed: '2026-01-30', usageCount: 15 },
  { id: 'T-014', name: 'Mini Session Promo', category: 'Marketing', type: 'Email', status: 'Active', lastUsed: '2026-01-20', usageCount: 8 },
  { id: 'T-015', name: 'Referral Thank You', category: 'Marketing', type: 'Email', status: 'Active', lastUsed: '2026-02-04', usageCount: 22 },
  { id: 'T-016', name: 'Anniversary Re-engagement', category: 'Marketing', type: 'Email', status: 'Active', lastUsed: '2026-01-18', usageCount: 14 },
  { id: 'T-017', name: 'Studio SOP - Editing Workflow', category: 'Operations', type: 'SOP', status: 'Active', lastUsed: '2026-02-01', usageCount: 6 },
  { id: 'T-018', name: 'Equipment Checkout Form', category: 'Operations', type: 'Form', status: 'Active', lastUsed: '2026-02-09', usageCount: 19 }
];

export const teamMembers = [
  { id: 'TM-001', name: 'Maya Chen', role: 'Lead Photographer & Owner', email: 'maya@luminancestudios.com', phone: '(512) 555-0100', specialties: ['Wedding', 'Commercial', 'Product'], activeSessions: 3, completedSessions: 142, rating: 4.9, status: 'Active', availability: 'Full Time' },
  { id: 'TM-002', name: 'Ethan Ruiz', role: 'Senior Photographer', email: 'ethan@luminancestudios.com', phone: '(512) 555-0101', specialties: ['Event', 'Engagement', 'Family'], activeSessions: 2, completedSessions: 98, rating: 4.8, status: 'Active', availability: 'Full Time' },
  { id: 'TM-003', name: 'Sofia Nakamura', role: 'Photographer', email: 'sofia@luminancestudios.com', phone: '(512) 555-0102', specialties: ['Newborn', 'Headshot', 'Portrait'], activeSessions: 2, completedSessions: 67, rating: 4.9, status: 'Active', availability: 'Full Time' },
  { id: 'TM-004', name: 'Jordan Ellis', role: 'Post-Production Editor', email: 'jordan@luminancestudios.com', phone: '(512) 555-0103', specialties: ['Color Grading', 'Retouching', 'Album Design'], activeSessions: 4, completedSessions: 210, rating: 4.7, status: 'Active', availability: 'Full Time' },
  { id: 'TM-005', name: 'Ava Torres', role: 'Studio Manager', email: 'ava@luminancestudios.com', phone: '(512) 555-0104', specialties: ['Scheduling', 'Client Relations', 'Operations'], activeSessions: 0, completedSessions: 0, rating: null, status: 'Active', availability: 'Full Time' }
];

export const workflows = [
  { id: 'WF-001', name: 'New Client Welcome', trigger: 'New client created', steps: ['Send Welcome Email', 'Attach Pre-Session Questionnaire', 'Create Client Folder', 'Schedule Consultation Call'], status: 'Active', timesRun: 127 },
  { id: 'WF-002', name: 'Session Prep Sequence', trigger: '5 days before session', steps: ['Send Prep Guide Email', 'Send Shot List', 'Send 48-Hour Reminder', 'Confirm Location Details'], status: 'Active', timesRun: 284 },
  { id: 'WF-003', name: 'Post-Session Delivery', trigger: 'Session status → Editing Complete', steps: ['Upload to Gallery', 'Generate Gallery Link', 'Send Gallery Delivery Email', 'Set 30-Day Expiration', 'Schedule Review Request (7 days)'], status: 'Active', timesRun: 198 },
  { id: 'WF-004', name: 'Payment Follow-Up', trigger: 'Invoice overdue by 3 days', steps: ['Send Gentle Reminder Email', 'Wait 4 Days', 'Send Second Reminder', 'Flag for Manual Follow-Up'], status: 'Active', timesRun: 34 },
  { id: 'WF-005', name: 'Review & Referral', trigger: '14 days after gallery delivery', steps: ['Send Review Request Email', 'Wait 7 Days', 'Send Referral Offer Email', 'Add to Re-engagement List'], status: 'Active', timesRun: 89 },
  { id: 'WF-006', name: 'Anniversary Re-engagement', trigger: '11 months after session', steps: ['Send Anniversary Email', 'Include Mini Session Promo', 'Offer Loyalty Discount', 'Track Response'], status: 'Active', timesRun: 42 }
];

export const monthlyRevenue = [
  { month: 'Sep', revenue: 32400 },
  { month: 'Oct', revenue: 38200 },
  { month: 'Nov', revenue: 41800 },
  { month: 'Dec', revenue: 28900 },
  { month: 'Jan', revenue: 44200 },
  { month: 'Feb', revenue: 47850 }
];

export const sessionsByType = [
  { type: 'Wedding', count: 18, revenue: 86400 },
  { type: 'Portrait', count: 45, revenue: 29250 },
  { type: 'Commercial', count: 32, revenue: 73600 },
  { type: 'Event', count: 12, revenue: 54000 },
  { type: 'Headshot', count: 38, revenue: 17100 },
  { type: 'Newborn', count: 22, revenue: 16500 },
  { type: 'Engagement', count: 15, revenue: 12750 },
  { type: 'Product', count: 24, revenue: 36000 }
];
