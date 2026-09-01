export const siteConfig = {
  name: "TEDxGHRCEMN",
  edition: "2nd Edition",
  theme: "Beyond the Dots",
  themeStatus: "Official 2026 theme",
  date: "9 September 2026",
  dateStatus: "9:00 AM–6:00 PM IST",
  venue: "G H Raisoni College of Engineering and Management, Nagpur",
  venueAddress: "Wadi Link Road, MIDC, Hingna, Nagpur, Maharashtra, India",
  mode: "In-person • Paid",
  registrationUrl: "https://konfhub.com/tedxghrcemn-82e1c5a4",
  beyondBuildUrl: "https://konfhub.com/beyondbuild",
  aiWorkshopUrl: "https://konfhub.com/ai-in-development-design",
  instagramUrl: "https://www.instagram.com/tedx_ghrcemn/",
  tedEventUrl: "https://www.ted.com/tedx/events/69572",
  institutionUrl: "https://ghrcemn.raisoni.net",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=G+H+Raisoni+College+of+Engineering+and+Management%2C+Nagpur+%28GHRCEMN%29%2C+Wadi+Link+Road%2C+MIDC%2C+Hingna%2C+Nagpur%2C+Maharashtra%2C+India",
  email: "tedxghrcemn@gmail.com",
  disclaimer: "This independent TEDx event is operated under license from TED.",
};

export const navItems = [
  ["Home", "/"], ["About", "/about"], ["Event", "/event"],
  ["Speakers", "/speakers"], ["Activities", "/activities"],
  ["Team", "/team"], ["Gallery", "/gallery"], ["Contact", "/contact"],
] as const;

export const secondaryNav = [["Partners", "/partners"], ["FAQs", "/faqs"]] as const;

export const speakers = [
  {
    id: "ajinkya-gandhe",
    name: "Ajinkya Gandhe",
    field: "Architect-Turned-Culinary Entrepreneur | Co-founder – Place, Nagpur | MasterChef India Season 9 Winner",
    bio: "Ajinkya Gandhe blends architecture and culinary creativity to craft memorable food experiences. From Goa's cafés and supper clubs to Place in Nagpur, his journey reflects innovation, passion and design. In 2026, he and his brother Vikram made history as the first sibling duo to win MasterChef India.",
    image: "/speakers/ajinkya-gandhe-2026.jpeg",
  },
  {
    id: "janhvi-v-singh",
    name: "Janhvi V Singh",
    field: "Content Creator | National Prime Minister Awardee and Founder of Sattva",
    bio: "Janhvi V Singh is a notable Indian content creator known for promoting culture, scriptures, and sarees, earning the title \"arși air\" creator. She gained national recognition when Prime Minister Narendra Modi awarded her the Heritage Icon of the Year Award at the National Creators Awards in March 2024. Additionally, she founded Sattva Sangha, a community organization focused on Indian culture, heritage, and spirituality.",
    image: "/speakers/janhvi-v-singh-2026.jpeg",
  },
  {
    id: "sarang-thakre",
    name: "Sarang Thakre",
    field: "Founder, BigtopSocial & Matoshri Infra",
    bio: "Sarang Thakre is an entrepreneur, digital marketing strategist, and educator based in Nagpur. As the founder of BigtopSocial and Matoshri Infra, he works at the intersection of business growth, digital strategy, and social impact. With expertise in digital execution, performance-driven marketing, and education, Sarang continues to help businesses and individuals turn ideas and potential into meaningful outcomes.",
    image: "/speakers/sarang-thakre-2026.jpeg",
  },
  {
    id: "priyanka-sharma",
    name: "Priyanka Sharma",
    field: "Communication Coach & Consultant, Raisoni Education",
    bio: "Priyanka Sharma is a Content Consultant and Communication Coach with experience in brand communication, PR, academia, and employability development. A former Content Editor at The Times of India, she has worked with luxury brands, agrotech companies, and other sectors, with features in Forbes and Femina. She is also a visiting faculty member and resource person for training programmes at Higher Education Institutions, the National Human Rights Commission, WCDO, and community organizations. She co-authored Communication Skills for Budding Professionals, adopted as a textbook for first-year engineering and management students.",
    image: "/speakers/priyanka-sharma-2026.jpeg",
  },
] as const;

export const activities = [
  { title: "Beyond Build", category: "Pre-Fest Experience", description: "A paid, in-person team experience held on the day before the TEDxGHRCEMN Main Event.", dateTime: "8 September 2026 • 10:00 AM–6:00 PM IST", venue: "B-107, B Block, GHRCEMN", eligibility: "Teams of 2–4 participants", price: "₹99", registrationUrl: "https://konfhub.com/beyondbuild" },
  { title: "AI in Development & Design", category: "Pre-Fest Workshop", description: "A paid, in-person workshop focused on AI in development and design.", dateTime: "8 September 2026 • 11:00 AM–3:00 PM IST", venue: "GHRCEMN, Nagpur", eligibility: "Individual registration", price: "₹99", registrationUrl: "https://konfhub.com/ai-in-development-design" },
];

export const schedule = {
  day1: [
    ["10:00–18:00", "Beyond Build", "Pre-Fest", "B-107, B Block"],
    ["11:00–15:00", "AI in Development & Design", "Pre-Fest workshop", "GHRCEMN"],
  ],
  day2: [
    ["09:00–18:00", "TEDxGHRCEMN — Beyond the Dots", "Full programme", "GHRCEMN, Nagpur"],
  ],
};

export const teamGroups = [
  {
    title: "Leadership",
    members: [
      { name: "Karan Baghele", role: "Organizer", image: "/team/karan-baghele.jpg" },
      { name: "Khushi Chordiya", role: "Co-Organizer", image: "/team/khushi-chordiya.jpg" },
      { name: "Karan Soni", role: "Joint Secretary", image: "/team/karan-soni.jpg" },
      { name: "Pragati Shripad", role: "Secretary", image: "/team/pragati-shripad-card.jpeg" },
    ],
  },
  {
    title: "Event Management",
    members: [
      { name: "Nihar Bhoyar", role: "Event Manager", image: "/team/nihar-bhoyar.jpg" },
      { name: "Lavi Shahu", role: "Event Manager", image: "/team/lavi-shahu.jpg" },
    ],
  },
  {
    title: "Media & Technology",
    members: [
      { name: "Rohit Deshmukh", role: "Social Media Lead", image: "/team/rohit-deshmukh-card.jpeg" },
      { name: "Kshitij Ingole", role: "Social Media Manager", image: "/team/kshitij-ingole.jpg" },
      { name: "Vishwesh Vishal Aiya", role: "Website Manager", image: "/team/vishwesh-aiya.jpg" },
    ],
  },
  {
    title: "Volunteer Team",
    members: [
      { name: "Rashi Mishra", role: "Volunteer In-Charge", image: "/team/rashi-mishra.jpg" },
      { name: "Shimpali Tilak Haware", role: "Volunteer", image: "/team/shimpali-haware-card.jpeg" },
      { name: "Pranjal Manoj Pangul", role: "Volunteer", image: "/team/pranjal-pangul.jpg" },
      { name: "Siddhi Mangesh Kunjarkar", role: "Volunteer", image: "/team/siddhi-kunjarkar.jpg" },
      { name: "Pooja Mohnani", role: "Volunteer", image: "/team/pooja-mohnani.jpg" },
    ],
  },
] as const;

export const galleryItems = [
  { image: "/gallery/audience-01.jpg", category: "Audience", alt: "Audience gathered for a TEDxGHRCEMN session", caption: "The audience arrives" },
  { image: "/gallery/audience-02.jpg", category: "Audience", alt: "Audience members at TEDxGHRCEMN", caption: "A shared moment in the room" },
  { image: "/gallery/audience-03.jpg", category: "Audience", alt: "Audience listening during TEDxGHRCEMN", caption: "Listening together" },
  { image: "/gallery/audience-04.jpg", category: "Audience", alt: "TEDxGHRCEMN audience in the event hall", caption: "Ideas in the room" },
  { image: "/gallery/audience-05.jpg", category: "Audience", alt: "Audience at a TEDxGHRCEMN session", caption: "Conversations taking shape" },
  { image: "/gallery/audience-06.jpg", category: "Audience", alt: "TEDxGHRCEMN audience watching the stage", caption: "An audience in focus" },
  { image: "/gallery/stage-01.jpg", category: "On Stage", alt: "Speaker on the TEDxGHRCEMN stage", caption: "A voice on stage" },
  { image: "/gallery/stage-02.jpg", category: "On Stage", alt: "TEDxGHRCEMN stage moment", caption: "Ideas in motion" },
  { image: "/gallery/stage-03.jpg", category: "On Stage", alt: "Speaker addressing the TEDxGHRCEMN audience", caption: "A speaker's moment" },
  { image: "/gallery/stage-04.jpg", category: "On Stage", alt: "Performance on the TEDxGHRCEMN stage", caption: "A performance in full colour" },
  { image: "/gallery/stage-05.jpg", category: "On Stage", alt: "Speaker sharing an idea on stage", caption: "A story being shared" },
  { image: "/gallery/stage-06.jpg", category: "On Stage", alt: "TEDxGHRCEMN stage conversation", caption: "In conversation" },
  { image: "/gallery/stage-07.jpg", category: "On Stage", alt: "TEDxGHRCEMN speaker on stage", caption: "A point of view" },
  { image: "/gallery/stage-08.jpg", category: "On Stage", alt: "Moment on the TEDxGHRCEMN stage", caption: "A moment on the TEDx stage" },
  { image: "/gallery/stage-09.jpg", category: "On Stage", alt: "TEDxGHRCEMN speaker presenting", caption: "An idea, live" },
  { image: "/gallery/stage-10.jpg", category: "On Stage", alt: "TEDxGHRCEMN talk in progress", caption: "A conversation that moves" },
  { image: "/gallery/stage-11.jpg", category: "On Stage", alt: "TEDxGHRCEMN stage close-up", caption: "The stage, up close" },
  { image: "/gallery/stage-12.jpg", category: "On Stage", alt: "Speaker with the TEDxGHRCEMN audience", caption: "A voice with the room" },
  { image: "/gallery/stage-13.jpg", category: "On Stage", alt: "TEDxGHRCEMN speaker in focus", caption: "A moment of focus" },
  { image: "/gallery/stage-14.jpg", category: "On Stage", alt: "TEDxGHRCEMN speaker sharing a story", caption: "A story in progress" },
  { image: "/gallery/stage-15.jpg", category: "On Stage", alt: "Close-up from the TEDxGHRCEMN stage", caption: "A close-up from the stage" },
  { image: "/gallery/honours-01.jpg", category: "Honours", alt: "Recognition moment at TEDxGHRCEMN", caption: "A moment of recognition" },
  { image: "/gallery/honours-02.jpg", category: "Honours", alt: "Appreciation exchange at TEDxGHRCEMN", caption: "An exchange of appreciation" },
  { image: "/gallery/honours-03.jpg", category: "Honours", alt: "TEDxGHRCEMN contribution being celebrated", caption: "Celebrating contribution" },
  { image: "/gallery/honours-04.jpg", category: "Honours", alt: "TEDxGHRCEMN acknowledgement moment", caption: "A shared acknowledgement" },
  { image: "/gallery/community-01.jpg", category: "Community", alt: "TEDxGHRCEMN community members together", caption: "The community behind the room" },
  { image: "/gallery/community-02.jpg", category: "Community", alt: "People behind TEDxGHRCEMN", caption: "People who made the day possible" },
  { image: "/gallery/community-03.jpg", category: "Community", alt: "TEDxGHRCEMN community group", caption: "A collective moment" },
] as const;

export const faqs = [
  ["What is TEDxGHRCEMN?", "TEDxGHRCEMN is a university TEDx event independently organised by a local volunteer team at G H Raisoni College of Engineering and Management, Nagpur."],
  ["When and where is the Main Event?", "Wednesday, 9 September 2026, from 9:00 AM to 6:00 PM IST at G H Raisoni College of Engineering and Management, Wadi Link Road, MIDC, Hingna, Nagpur."],
  ["Is the event in-person and paid?", "Yes. The Main Event and the listed Pre-Fest experiences are in-person, paid events."],
  ["What is the Main Event pass price?", "The KonfHub listing currently shows an Early Bird pass at ₹399 and a Regular pass at ₹449. Availability windows and inventory are controlled by KonfHub."],
  ["What are the Pre-Fest registrations?", "Beyond Build and AI in Development & Design take place on 8 September 2026. Both are currently listed at ₹99 on KonfHub."],
  ["Where do I register?", "Use the official KonfHub buttons on this website. The Main Event, Beyond Build, and AI in Development & Design each have a separate registration page."],
  ["Is registration handled by TEDxGHRCEMN?", "Ticketing, payment, ticket delivery, cancellation and refund matters are handled by the external ticketing provider."],
  ["How will I receive my ticket or pass?", "Confirmation and ticket-delivery details are provided by KonfHub after registration."],
  ["Whom should I contact?", "For event enquiries, email tedxghrcemn@gmail.com. For ticketing issues, use the support options shown on KonfHub."],
];

export const routeMeta: Record<string, { title: string; description: string }> = {
  about: { title: "About", description: "The story, purpose and context behind TEDxGHRCEMN." },
  event: { title: "Event", description: "Explore the two-day TEDxGHRCEMN experience and provisional schedule." },
  speakers: { title: "Speakers", description: "Meet the announced speakers taking the TEDxGHRCEMN stage in 2026." },
  activities: { title: "Activities", description: "Discover workshops and the student competition at the Pre-Fest." },
  team: { title: "Team", description: "Meet the public organising team behind TEDxGHRCEMN." },
  partners: { title: "Partners", description: "Institutional support and partnership opportunities for TEDxGHRCEMN." },
  gallery: { title: "Gallery", description: "Scenes from the first edition and future event highlights." },
  faqs: { title: "FAQs", description: "Useful answers about attending, registering and taking part." },
  contact: { title: "Contact", description: "General and partnership enquiries for TEDxGHRCEMN." },
};
