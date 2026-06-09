// Mock shift data for ShiftSync MVP
export const mockShifts = [
  {
    id: 1,
    title: "Barista",
    company: "Campus Coffee Co.",
    location: "Student Union Building",
    pay: 22.50,
    day: "Monday",
    startTime: "7:00 AM",
    endTime: "11:00 AM",
    hours: 4,
    requirements: ["Food handling cert", "Friendly attitude"],
    description: "Join our team serving coffee and snacks to fellow students. Fast-paced environment with great tips!"
  },
  {
    id: 2,
    title: "Library Assistant",
    company: "University Library",
    location: "Main Library - Level 2",
    pay: 21.00,
    day: "Tuesday",
    startTime: "2:00 PM",
    endTime: "6:00 PM",
    hours: 4,
    requirements: ["Attention to detail", "Quiet demeanor"],
    description: "Help organize books and assist students with finding resources. Perfect for study breaks!"
  },
  {
    id: 3,
    title: "Event Staff",
    company: "Student Events Corp",
    location: "Sports Arena",
    pay: 25.00,
    day: "Friday",
    startTime: "5:00 PM",
    endTime: "10:00 PM",
    hours: 5,
    requirements: ["Physical fitness", "Team player"],
    description: "Help set up and manage university events. Great networking opportunities!"
  },
  {
    id: 4,
    title: "Tutor Assistant",
    company: "Math Department",
    location: "Science Building Room 301",
    pay: 28.00,
    day: "Wednesday",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    hours: 2,
    requirements: ["Strong math skills", "Patience"],
    description: "Assist professors with tutoring sessions for first-year students."
  },
  {
    id: 5,
    title: "Retail Assistant",
    company: "Campus Bookstore",
    location: "Main Street Mall",
    pay: 23.00,
    day: "Saturday",
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    hours: 6,
    requirements: ["Customer service skills", "Flexible"],
    description: "Help students find textbooks and university merchandise."
  },
  {
    id: 6,
    title: "Food Delivery",
    company: "QuickBite Campus",
    location: "Campus-wide",
    pay: 24.00,
    day: "Thursday",
    startTime: "11:30 AM",
    endTime: "2:30 PM",
    hours: 3,
    requirements: ["Bike or scooter", "Smartphone"],
    description: "Deliver meals across campus. Flexible routes and instant pay!"
  },
  {
    id: 7,
    title: "Gym Receptionist",
    company: "University Fitness Center",
    location: "Sports Complex",
    pay: 21.50,
    day: "Sunday",
    startTime: "8:00 AM",
    endTime: "12:00 PM",
    hours: 4,
    requirements: ["First aid cert", "Fitness knowledge"],
    description: "Welcome gym members and manage equipment checkouts."
  },
  {
    id: 8,
    title: "Research Assistant",
    company: "Psychology Lab",
    location: "Behavioral Sciences Building",
    pay: 26.00,
    day: "Monday",
    startTime: "1:00 PM",
    endTime: "4:00 PM",
    hours: 3,
    requirements: ["Psychology major preferred", "Detail oriented"],
    description: "Assist with data collection and analysis for ongoing research projects."
  },
  {
    id: 9,
    title: "IT Help Desk",
    company: "Campus IT Services",
    location: "Technology Building",
    pay: 27.00,
    day: "Tuesday",
    startTime: "9:00 AM",
    endTime: "1:00 PM",
    hours: 4,
    requirements: ["Tech savvy", "Problem solving"],
    description: "Help students with laptop issues and software installations."
  },
  {
    id: 10,
    title: "Dining Hall Staff",
    company: "University Catering",
    location: "Central Dining Hall",
    pay: 20.50,
    day: "Wednesday",
    startTime: "5:00 PM",
    endTime: "8:00 PM",
    hours: 3,
    requirements: ["Food safety cert", "Teamwork"],
    description: "Serve meals and maintain dining area during dinner rush."
  },
  {
    id: 11,
    title: "Parking Attendant",
    company: "Campus Security",
    location: "Main Parking Lot",
    pay: 22.00,
    day: "Thursday",
    startTime: "7:00 AM",
    endTime: "11:00 AM",
    hours: 4,
    requirements: ["Valid driver's license", "Alert"],
    description: "Monitor parking areas and assist with visitor parking."
  },
  {
    id: 12,
    title: "Lab Assistant",
    company: "Chemistry Department",
    location: "Science Lab 102",
    pay: 29.00,
    day: "Friday",
    startTime: "2:00 PM",
    endTime: "5:00 PM",
    hours: 3,
    requirements: ["Chemistry knowledge", "Safety conscious"],
    description: "Prepare lab materials and assist students during practical sessions."
  },
  {
    id: 13,
    title: "Social Media Manager",
    company: "Student Union",
    location: "Remote",
    pay: 25.00,
    day: "Saturday",
    startTime: "10:00 AM",
    endTime: "2:00 PM",
    hours: 4,
    requirements: ["Social media experience", "Creative"],
    description: "Manage student union social accounts and create engaging content."
  },
  {
    id: 14,
    title: "Tutoring Center Staff",
    company: "Academic Support",
    location: "Learning Commons",
    pay: 26.50,
    day: "Sunday",
    startTime: "1:00 PM",
    endTime: "5:00 PM",
    hours: 4,
    requirements: ["GPA 3.5+", "Communication skills"],
    description: "Provide peer tutoring in various subjects to fellow students."
  },
  {
    id: 15,
    title: "Warehouse Assistant",
    company: "Campus Logistics",
    location: "Storage Facility",
    pay: 23.50,
    day: "Monday",
    startTime: "6:00 AM",
    endTime: "10:00 AM",
    hours: 4,
    requirements: ["Physical strength", "Organized"],
    description: "Help organize and distribute supplies across campus buildings."
  }
];

// Days of the week
export const daysOfWeek = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

// Time slots for availability
export const timeSlots = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"
];

// Availability presets
export const availabilityPresets = [
  { name: "Mornings Only", times: ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"] },
  { name: "Afternoons Only", times: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"] },
  { name: "Evenings Only", times: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"] },
  { name: "Weekends", days: ["Saturday", "Sunday"] },
  { name: "Flexible", times: timeSlots }
];