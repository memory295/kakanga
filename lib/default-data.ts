import { Project, Service, Staff, Vacancy } from './types';

export const defaultProjects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Construction of Secondary School Hall',
    category: 'Construction',
    client: 'Karonga CDSS',
    referenceNumber: '',
    location: 'Karonga Town',
    image: "/images/house1.jpg",
    description: 'Construction of a modern secondary school hall with advanced facilities for educational activities and community gatherings.'
  },
  {
    title: 'Design and Fabrication of 2×40ft Containers into Warehouse',
    category: 'Fabrication',
    client: 'Banja Lamsogolo, Box 1854, Lilongwe, Malawi',
    referenceNumber: 'PO-BLM-00773 & PO-BLM-00994',
    location: 'Banja House, Head Office, Along Paul Kagame Road, Lilongwe',
    image: "/images/van.jpg",
    description: 'Professional design and fabrication of shipping containers into functional warehouse space with optimal storage solutions.'
  },
  {
    title: 'Residential House Maintenance/Rehabilitation',
    category: 'Rehabilitation',
    client: 'CCAP General Assembly, P.O. Box 30398, Capital City, Lilongwe 3',
    referenceNumber: 'House Rehabilitation Plot No:47/2/134',
    location: 'Area 47 Sector 2, Lilongwe',
    image: "/images/rehab.jpg",
    description: 'Complete rehabilitation and maintenance of residential properties with modern standards and quality finishes.'
  },
  {
    title: 'Residential House Maintenance/Rehabilitation (Mzuzu)',
    category: 'Rehabilitation',
    client: 'Ministry of Lands Private Bag 311, Capital City, Lilongwe 3, Malawi',
    referenceNumber: '130/L/PH/MZ/120',
    location: 'Chimalilo Area in Mzuzu City',
    image: "/images/house2.jpg",
    description: 'Comprehensive house rehabilitation project in Mzuzu with structural improvements and modern amenities.'
  },
  {
    title: 'Installation of Prefabricated Structure and Security Fence',
    category: 'Installation',
    client: 'Department of Disaster Management Affairs (DoDMA)',
    referenceNumber: '090/IPDC/DoDMA/2023-24/009',
    location: 'Karonga District Council and Salima District Council',
    image: "/images/image2.jpg",
    description: 'Installation of prefabricated structures and security fencing for disaster management facilities.'
  },
  {
    title: 'Container Offices Re-location',
    category: 'Installation',
    client: 'Malawi Bureau of Standards P.O Box 946, Blantyre',
    referenceNumber: 'MBS-SONGWE-RELOC/09/2024',
    location: 'Songwe Border Post, Karonga',
    image: "/images/IMG_20221019_173829.jpg",
    description: 'Professional relocation and installation of container offices at border post with full utility connections.'
  },
  {
    title: 'Supply Fabrication of Car Van into Office',
    category: 'Fabrication',
    client: 'Katsuka Investments - Blantyre',
    referenceNumber: '',
    location: 'Nancholi, Blantyre',
    image: "/images/IMG_20221019_173847.jpg",
    description: 'Creative fabrication project converting a car van into functional office space with modern amenities.'
  },
  {
    title: 'Supply and Fabrication of Shipping Container into Office',
    category: 'Fabrication',
    client: 'Malawi Bureau of Standards P.O Box 946, Blantyre',
    referenceNumber: 'LPO 027044 and LPO 027258',
    location: 'Songwe Border Post, Karonga',
    image: "/images/IMG_20240713_203357_822.jpg",
    description: 'Professional fabrication of shipping containers into modern office spaces with complete interior fit-out.'
  },
  {
    title: 'Construction of Community Library',
    category: 'Construction',
    client: 'Change Her World (NGO)',
    referenceNumber: '',
    location: 'Uliwa, Chilumba in Karonga',
    image: "/images/IMG_20240713_203404_727.jpg",
    description: 'Construction of a community library to promote education and literacy in the local community.'
  },
];

export const defaultServices: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'House Design and Construction',
    description: 'We professionally design structures and construct. We also construct all kinds of designs presented to us. Trust us, we will transform your document/plan into that reality as planned without changing any feature or dimensions on the plan.',
    image: "/images/house1.jpg",
    features: [
      "Architectural Design",
      "Structural Engineering", 
      "Plan-to-Reality Execution",
      "Quality Finishes"
    ]
  },
  {
    title: 'Civil Works',
    description: 'Installing culverts for drainage, reshaping surfaces for smooth travel, and building small bridges for safe crossings — improving roads for better access and less maintenance.',
    image: "/images/image2.jpg",
    features: [
      "Culvert Installation",
      "Surface Reshaping",
      "Bridge Construction", 
      "Drainage Systems"
    ]
  },
  {
    title: 'Land Leveling & Grading',
    description: 'Professional land leveling and grading services to prepare your construction site. We ensure optimal drainage and foundation preparation for all types of construction projects.',
    image: "/images/IMG_20221019_173847.jpg",
    features: [
      "Site Preparation",
      "Drainage Solutions",
      "Foundation Grading",
      "Soil Compaction"
    ]
  },
  {
    title: 'Prefabricated Structures',
    description: 'Professional installation of prefab buildings and steel warehouses. Quick assembly with factory-made components for fast, durable construction.',
    image: '/images/van.jpg',
    features: [
      "Quick Assembly",
      "Factory-made Components",
      "Durable Construction",
      "Cost-effective Solutions"
    ]
  }
];

export const defaultStaff: Omit<Staff, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'STEVEN KABAGHE',
    role: 'Managing Director',
    photo: '/images/team/steven.jpg',
    department: 'Management',
    bio: 'Leading the company with vision and expertise in construction management.',
    email: 'steven@kakangaconstructions.com',
    phone: '+265 123 456 789'
  },
  {
    name: 'KONDWANI MWAFULIWA',
    role: 'Marketing Manager',
    photo: '/images/team/kondwani.jpg',
    department: 'Marketing',
    bio: 'Driving business growth through strategic marketing and client relations.',
    email: 'kondwani@kakangaconstructions.com',
    phone: '+265 123 456 790'
  },
  {
    name: 'ARTHUR MWAMBILA',
    role: 'Architecture',
    photo: '/images/team/arthur.jpg',
    department: 'Design',
    bio: 'Creating innovative architectural designs that bring visions to life.',
    email: 'arthur@kakangaconstructions.com',
    phone: '+265 123 456 791'
  }
];

export const defaultVacancies: Omit<Vacancy, 'id' | 'createdAt' | 'updatedAt' | 'postedDate' | 'applicationDeadline'>[] = [
  {
    title: "Civil Engineer",
    location: "Lilongwe",
    type: "Full-time",
    department: "Engineering",
    description: "We are looking for an experienced Civil Engineer to join our team and oversee construction projects from conception to completion.",
    requirements: [
      "Bachelor's degree in Civil Engineering",
      "5+ years experience in construction",
      "Professional registration preferred",
      "Strong project management skills",
    ],
    isActive: true,
  },
  {
    title: "Site Supervisor",
    location: "Blantyre",
    type: "Full-time", 
    department: "Operations",
    description: "Seeking a skilled Site Supervisor to manage daily construction activities and ensure project milestones are met safely and efficiently.",
    requirements: [
      "Diploma in Construction or related field",
      "3+ years supervisory experience",
      "Knowledge of safety regulations",
      "Strong leadership abilities",
    ],
    isActive: true,
  },
  {
    title: "Heavy Equipment Operator",
    location: "Various Locations",
    type: "Full-time",
    department: "Operations",
    description: "Experienced heavy equipment operators needed for excavators, graders, and bulldozers across multiple project sites.",
    requirements: [
      "Valid heavy equipment license",
      "3+ years operating experience", 
      "Good safety record",
      "Willingness to travel",
    ],
    isActive: true,
  },
  {
    title: "Quantity Surveyor",
    location: "Lilongwe",
    type: "Full-time",
    department: "Finance",
    description: "Looking for a detail-oriented Quantity Surveyor to manage project costs and prepare accurate bills of quantities.",
    requirements: [
      "Degree in Quantity Surveying",
      "Professional certification",
      "Experience with construction software",
      "Strong analytical skills",
    ],
    isActive: false,
  },
];