import type { Photo } from "../lib/image";

/**
 * All copy, imagery and project data. VERTEX is a fictional practice built as a
 * portfolio piece — every project, figure and address here is demonstration
 * content, and the site says so where a visitor could mistake it for a claim.
 */

export const brand = {
  name: "VERTEX",
  tagline: "We Build What Comes Next.",
  disciplines: "Engineering · Construction · Infrastructure",
};

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#expertise" },
  { label: "Approach", href: "#structure" },
  { label: "About", href: "#completion" },
  { label: "Contact", href: "#contact" },
];

/** The left rail. Each id is a real section anchor. */
export const stages = [
  { no: "01", label: "Vision", id: "vision" },
  { no: "02", label: "Land", id: "land" },
  { no: "03", label: "Foundation", id: "foundation" },
  { no: "04", label: "Structure", id: "structure" },
  { no: "05", label: "Progress", id: "progress" },
  { no: "06", label: "Finishing", id: "finishing" },
  { no: "07", label: "Completion", id: "completion" },
  { no: "08", label: "Projects", id: "projects" },
];

/* ---------------------------------------------------------------- imagery */

export const photos = {
  // The hero and the completion payoff are deliberately the same photograph:
  // the visitor ends the journey looking at the building they started with.
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
  interiorLux: { id: "1758448755952-42b404bc6f39", alt: "Completed residential interior, furnished" },
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
  stats: [
    { value: "25+", label: "Major Projects" },
    { value: "12", label: "Years Experience" },
    { value: "18", label: "Cities" },
    { value: "98%", label: "Projects Delivered" },
  ],
  statsNote: "Portfolio demonstration figures",
};

/* ---------------------------------------------------------------- stages */

/** Stage 02 — the land is surveyed, drawn, then designed on. */
export const landSteps = [
  { no: "01", title: "Site survey", note: "Levels, boundaries and ground conditions recorded." },
  { no: "02", title: "Planning", note: "Zoning, access, services and constraints resolved." },
  { no: "03", title: "Design", note: "Massing and floor plates set against the site." },
  { no: "04", title: "Approval", note: "Drawings issued for statutory consent." },
];

/** Stage 03 — the sequence below ground, in scroll order. */
export const foundationSteps = [
  { at: 0.0, label: "Ground level", detail: "Site cleared and set out" },
  { at: 0.25, label: "Excavation", detail: "Cut to formation level" },
  { at: 0.5, label: "Reinforcement", detail: "Rebar cages fixed" },
  { at: 0.75, label: "Concrete", detail: "Raft poured and vibrated" },
  { at: 1.0, label: "Foundation complete", detail: "Cured to design strength" },
];

/** Stage 04 — what the building is doing at each point of the scroll. */
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

/** Stage 05 — what is happening on site as the scroll advances. */
export const progressSteps = [
  { no: "01", title: "Cranes in motion", note: "Lifting plan runs the day." },
  { no: "02", title: "Materials arrive", note: "Steel, glass and services staged by floor." },
  { no: "03", title: "Glazing installed", note: "Units craned and sealed, floor by floor." },
  { no: "04", title: "Exterior closes", note: "The building becomes weathertight." },
  { no: "05", title: "Scaffolding down", note: "The facade is revealed." },
  { no: "06", title: "Interior fit-out", note: "Services, finishes, commissioning." },
];

export const finishingSteps = [
  { title: "Facade", note: "Sealed, aligned, cleaned" },
  { title: "Lighting", note: "Commissioned and balanced" },
  { title: "Interiors", note: "Floors, joinery, fittings" },
  { title: "Handover", note: "Tested and signed off" },
];

/** Stage 07 — the finished project. Demonstration data. */
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
    blurb: "Office buildings, retail and mixed-use business complexes delivered to programme.",
    items: ["Office buildings", "Retail", "Business complexes"],
    photo: photos.commercial,
  },
  {
    key: "residential",
    title: "Residential",
    blurb: "Apartments, estates and private homes built to live in for decades.",
    items: ["Apartments", "Estates", "Luxury homes"],
    photo: photos.residential,
  },
  {
    key: "infrastructure",
    title: "Infrastructure",
    blurb: "Roads, bridges and drainage that carry a city's daily load.",
    items: ["Roads", "Bridges", "Drainage"],
    photo: photos.bridgeMist,
  },
  {
    key: "industrial",
    title: "Industrial",
    blurb: "Factories, warehouses and processing facilities engineered around the process.",
    items: ["Factories", "Warehouses", "Processing facilities"],
    photo: photos.industrial,
  },
  {
    key: "engineering",
    title: "Engineering",
    blurb: "Structural and civil engineering, and project management from brief to handover.",
    items: ["Structural", "Civil", "Project management"],
    photo: photos.plansDesk,
  },
];

/* -------------------------------------------------------------- projects */

export const projects = [
  {
    name: "Harbour Interchange",
    kind: "Infrastructure",
    place: "Lagos, Nigeria",
    year: "2025",
    stat: "4.2 km elevated carriageway",
    photo: photos.interchange,
  },
  {
    name: "Meridian Residences",
    kind: "Residential",
    place: "Nairobi, Kenya",
    year: "2024",
    stat: "212 apartments across three blocks",
    photo: photos.apartments,
  },
  {
    name: "Northgate Logistics Park",
    kind: "Industrial",
    place: "Jeddah, Saudi Arabia",
    year: "2025",
    stat: "90,000 m² of warehousing",
    photo: photos.industrial,
  },
  {
    name: "Strait Crossing",
    kind: "Infrastructure",
    place: "Istanbul, Türkiye",
    year: "2023",
    stat: "1.1 km cable-stayed span",
    photo: photos.bridgeAerial,
  },
];

export const contact = {
  lines: ["Vertex Engineering & Construction", "Demonstration portfolio — details are fictional"],
  email: "studio@vertex.example",
  phone: "+000 0000 000 000",
  address: "Plot 14, Marina District",
};
