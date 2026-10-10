import type { Photo } from "../lib/image";

/**
 * All copy, imagery and project data for VERTEX — a fictional engineering and
 * construction practice. Every project, figure and contact detail here is
 * demonstration content, and the page says so wherever a visitor could mistake
 * it for a real claim.
 */

export const brand = {
  name: "VERTEX",
  tagline: "We Build What Comes Next.",
  disciplines: "Engineering · Construction · Infrastructure",
};

export const navLinks = [
  { label: "Home", href: "#vision" },
  { label: "Projects", href: "#showcase" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#completion" },
  { label: "Contact", href: "#contact" },
];

/** The scroll journey rail — ten numbered stops down the left edge. */
export const journey = [
  { no: 1, label: "Hero", sub: "Concept", id: "vision" },
  { no: 2, label: "Land", sub: "& Planning", id: "land" },
  { no: 3, label: "Foundation", sub: "", id: "foundation" },
  { no: 4, label: "Structure", sub: "", id: "structure" },
  { no: 5, label: "Building", sub: "Progress", id: "progress" },
  { no: 6, label: "Finishing", sub: "", id: "finishing" },
  { no: 7, label: "Completed", sub: "Building", id: "completion" },
  { no: 8, label: "Our Services", sub: "", id: "services" },
  { no: 9, label: "Project", sub: "Showcase", id: "showcase" },
  { no: 10, label: "Footer", sub: "", id: "contact" },
];

/* ---------------------------------------------------------------- imagery */

export const photos = {
  // Hero and completion are deliberately the same building: the visitor ends
  // the journey looking at what they started with.
  tower: { id: "1547669205-39038d0a1df1", alt: "Completed tower against a deep orange sunset sky" },
  emptyLand: { id: "1624856472328-bfcf71c34741", alt: "Bare graded land under a heavy grey sky" },
  sitePrep: { id: "1777106353531-9a6e76608df5", alt: "Cleared construction site with mounds of earth" },
  survey: { id: "1766830110938-0ea8a6d78ecb", alt: "Surveyor using a total station on open ground" },
  surveyTripod: { id: "1770822662903-aa69f6aa9b03", alt: "Engineer in a high-visibility vest using surveying equipment" },
  plans: { id: "1721244654394-36a7bc2da288", alt: "Architectural blueprint of a multi-storey building" },
  plansDesk: { id: "1603901622056-0a5bee231395", alt: "Architectural drawings with drafting pencils and a scale rule" },
  excavation: { id: "1764422743505-97c9ea0e43f2", alt: "Two excavators cutting into the ground of a construction site" },
  rebar: { id: "1768677903496-becc4be07258", alt: "Engineer inspecting a vast grid of steel reinforcement" },
  concrete: { id: "1774931363306-5a896cd4dd02", alt: "Workers placing and levelling freshly poured concrete" },
  foundationSite: { id: "1599995903128-531fc7fb694b", alt: "Tower cranes above completed concrete foundations at dusk" },
  frame: { id: "1508450859948-4e04fabaa4ea", alt: "Concrete building frame under construction" },
  crane: { id: "1535732759880-bbd5c7265e3f", alt: "Tower crane seen from below against the sky" },
  cranes: { id: "1485083269755-a7b559a4fe5e", alt: "Several tower cranes above a building site at dusk" },
  aerial: { id: "1786744026397-32dade526eaa", alt: "Aerial view of a large construction site with cranes" },
  scaffold: { id: "1636362556682-11231883c01c", alt: "High-rise building wrapped in scaffolding" },
  workers: { id: "1579847188804-ecba0e2ea330", alt: "Construction workers silhouetted against a sunset" },
  facade: { id: "1532888277436-2286814f0ee1", alt: "Glass office facade reflecting a soft violet sky" },
  facadeGlass: { id: "1523477593243-78bbf626fd3b", alt: "Close view of a glazed curtain wall" },
  lobby: { id: "1774192620890-f61475279725", alt: "Finished lobby with marble floors and wood panelling" },
  interior: { id: "1757924461488-ef9ad0670978", alt: "Finished interior with large windows and soft daylight" },
  commercial: { id: "1565008447742-97f6f38c985c", alt: "Commercial towers under a bright sky" },
  residential: { id: "1624204386084-dd8c05e32226", alt: "Residential building with glazed balconies" },
  apartments: { id: "1545324418-cc1a3fa10c00", alt: "High-rise residential block from below" },
  bridgeMist: { id: "1515674744565-0d7112cd179a", alt: "Cable-stayed bridge crossing water in mist" },
  bridgeAerial: { id: "1512187849-463fdb898f21", alt: "Aerial view of a long road bridge" },
  interchange: { id: "1536099629323-44806c1ea264", alt: "Aerial view of a multi-level road interchange" },
  industrial: { id: "1759666524819-03efac95eb99", alt: "Industrial processing facility with a tall stack" },
  cityDusk: { id: "1457974947974-1d290928d5c7", alt: "City towers photographed from the air at golden hour" },
} satisfies Record<string, Photo>;

/* ------------------------------------------------------------------ hero */

export const hero = {
  eyebrow: "Vertex · Engineering & Construction",
  lines: ["We build", "what comes next."],
  body: "Engineering, construction and infrastructure designed to stand for generations.",
  primary: "Explore Our Projects",
  secondary: "Watch the Process",
  stats: [
    { value: "25+", label: "Major Projects" },
    { value: "12", label: "Years Experience" },
    { value: "18", label: "Cities" },
    { value: "98%", label: "Projects Delivered" },
  ],
  statsNote: "Portfolio demonstration figures",
};

/* ---------------------------------------------------------------- stages */

/** Stage 02 — the planning panel that sits beside the site. */
export const planningSteps = [
  { icon: "survey", title: "Site Survey", note: "Levels, boundaries and ground conditions recorded." },
  { icon: "plan", title: "Planning", note: "Zoning, access, services and constraints resolved." },
  { icon: "model", title: "3D Design", note: "Massing and floor plates set against the site." },
  { icon: "check", title: "Approval", note: "Drawings issued for statutory consent." },
] as const;

export const foundationSteps = [
  { at: 0.0, label: "Ground level", detail: "Site cleared and set out" },
  { at: 0.25, label: "Excavation", detail: "Cut to formation level" },
  { at: 0.5, label: "Reinforcement", detail: "Rebar cages fixed" },
  { at: 0.75, label: "Concrete", detail: "Raft poured and vibrated" },
  { at: 1.0, label: "Foundation complete", detail: "Cured to design strength" },
];

export const structureSteps = [
  { at: 0.0, label: "Foundation" },
  { at: 0.15, label: "Ground floor columns" },
  { at: 0.3, label: "First floor" },
  { at: 0.45, label: "Second floor" },
  { at: 0.6, label: "Middle floors" },
  { at: 0.75, label: "Upper floors" },
  { at: 0.9, label: "Roof" },
  { at: 1.0, label: "Structural frame complete" },
];

export const explodedParts = [
  { name: "Roof", note: "Plant, drainage, fall protection" },
  { name: "Envelope", note: "Curtain wall and cladding" },
  { name: "Floors", note: "Post-tensioned slabs" },
  { name: "Beams", note: "Transfer and edge beams" },
  { name: "Columns", note: "Load path to foundation" },
  { name: "Foundation", note: "Raft and piles" },
];

export const progressSteps = [
  { no: "01", title: "Cranes in motion", note: "The lifting plan runs the day." },
  { no: "02", title: "Materials arrive", note: "Steel, glass and services staged by floor." },
  { no: "03", title: "Glazing installed", note: "Units craned and sealed, floor by floor." },
  { no: "04", title: "Exterior closes", note: "The building becomes weathertight." },
  { no: "05", title: "Scaffolding down", note: "The facade is revealed." },
  { no: "06", title: "Interior fit-out", note: "Services, finishes, commissioning." },
];

/** Stage 06 — markers placed on the finished building, as in a handover drawing. */
export const finishingHotspots = [
  { x: 24, y: 32, title: "Curtain wall", note: "Unitised glazing, sealed and aligned" },
  { x: 62, y: 52, title: "Lighting", note: "Commissioned and balanced throughout" },
  { x: 40, y: 74, title: "Entrance", note: "Stone, joinery and signage complete" },
];

export const completedProject = {
  name: "The Vertex Tower",
  location: "Dubai, UAE",
  facts: [
    { k: "Area", v: "48,000 m²" },
    { k: "Floors", v: "25" },
    { k: "Type", v: "Commercial Development" },
    { k: "Completed", v: "2026" },
  ],
};

/* -------------------------------------------------------------- services */

export const services = [
  {
    key: "commercial",
    title: "Commercial",
    sub: "Buildings",
    blurb: "Office buildings, retail and mixed-use business complexes delivered to programme.",
    items: ["Office buildings", "Retail", "Business complexes"],
    photo: photos.commercial,
  },
  {
    key: "residential",
    title: "Residential",
    sub: "Estates",
    blurb: "Apartments, estates and private homes built to live in for decades.",
    items: ["Apartments", "Estates", "Luxury homes"],
    photo: photos.residential,
  },
  {
    key: "infrastructure",
    title: "Infrastructure",
    sub: "Roads & Bridges",
    blurb: "Roads, bridges and drainage that carry a city's daily load.",
    items: ["Roads", "Bridges", "Drainage"],
    photo: photos.bridgeMist,
  },
  {
    key: "industrial",
    title: "Industrial",
    sub: "Facilities",
    blurb: "Factories, warehouses and processing facilities engineered around the process.",
    items: ["Factories", "Warehouses", "Processing facilities"],
    photo: photos.industrial,
  },
  {
    key: "management",
    title: "Project",
    sub: "Management",
    blurb: "Structural and civil engineering, and project management from brief to handover.",
    items: ["Structural", "Civil", "Project management"],
    photo: photos.plansDesk,
  },
];

/* -------------------------------------------------------------- showcase */

export const projectFilters = ["All", "Commercial", "Residential", "Infrastructure", "Industrial"];

export type Project = {
  name: string;
  kind: string;
  place: string;
  year: string;
  area: string;
  status: string;
  /** The same site at three points in its life, for the comparison slider. */
  before: Photo;
  during: Photo;
  after: Photo;
};

export const projects: Project[] = [
  {
    name: "The Vertex Tower",
    kind: "Commercial",
    place: "Dubai, UAE",
    year: "2026",
    area: "48,000 m²",
    status: "Completed",
    before: photos.emptyLand,
    during: photos.scaffold,
    after: photos.tower,
  },
  {
    name: "Meridian Residences",
    kind: "Residential",
    place: "Nairobi, Kenya",
    year: "2024",
    area: "212 apartments",
    status: "Completed",
    before: photos.sitePrep,
    during: photos.frame,
    after: photos.apartments,
  },
  {
    name: "Harbour Interchange",
    kind: "Infrastructure",
    place: "Lagos, Nigeria",
    year: "2025",
    area: "4.2 km elevated",
    status: "Completed",
    before: photos.excavation,
    during: photos.cranes,
    after: photos.interchange,
  },
  {
    name: "Northgate Logistics Park",
    kind: "Industrial",
    place: "Jeddah, Saudi Arabia",
    year: "2025",
    area: "90,000 m²",
    status: "Completed",
    before: photos.emptyLand,
    during: photos.aerial,
    after: photos.industrial,
  },
  {
    name: "Strait Crossing",
    kind: "Infrastructure",
    place: "Istanbul, Türkiye",
    year: "2023",
    area: "1.1 km span",
    status: "Completed",
    before: photos.sitePrep,
    during: photos.crane,
    after: photos.bridgeAerial,
  },
  {
    name: "Lumen Office Campus",
    kind: "Commercial",
    place: "Accra, Ghana",
    year: "2024",
    area: "26,000 m²",
    status: "Completed",
    before: photos.emptyLand,
    during: photos.frame,
    after: photos.facade,
  },
];

export const contact = {
  note: "Demonstration portfolio — all details are fictional",
  email: "studio@vertex.example",
  phone: "+000 0000 000 000",
  address: "Plot 14, Marina District",
};
