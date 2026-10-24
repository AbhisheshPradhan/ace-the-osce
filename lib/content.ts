const LIVE_URL = "https://acetheosce.com.au";

// The URL this deployment is served from. On Vercel this is the project's production domain:
// the .vercel.app address until acetheosce.com.au is added, then the real domain.
// SITE_URL overrides it if ever needed.
const siteUrl =
	process.env.SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: LIVE_URL);

// Only the real domain should be indexed; .vercel.app previews tell search engines to stay away.
export const isLiveSite = siteUrl === LIVE_URL;

export const site = {
	name: "Ace the OSCE",
	tagline: "Your ultimate preparation for the ACEM Fellowship Exam since 2016.",
	email: "acetheosce@gmail.com",
	enrolUrl: "https://events.humanitix.com/ce-the-osce-course-2026-2/tickets",
	url: siteUrl,
	foundedYear: 2016,
	copyrightYear: 2026,
	location: {
		name: "Simulation Centre (SiLECT)",
		streetAddress: "Level 3 WECC, Westmead Hospital, Cnr Hawkesbury Road and Darcy Rd",
		locality: "Westmead",
		region: "NSW",
		postcode: "2145",
		address:
			"Level 3 WECC, Westmead Hospital, Cnr Hawkesbury Road and Darcy Rd, Westmead NSW 2145, Australia",
		// Google can't resolve the full address to one place (no pin), but it knows WECC by name.
		mapQuery: "Westmead Education and Conference Centre, Westmead NSW 2145",
	},
};

export const stats = [
	{
		value: `${site.copyrightYear - site.foundedYear}+`,
		label: "Years running",
	},
	{ value: "50+", label: "Courses delivered" },
	{ value: "500+", label: "Attendees" },
];

// Shown in the hero and used for the Event structured data.
export const nextCourse = {
	date: "Friday 24 July 2026",
	shortDate: "Fri 24 July 2026",
	time: "8:00am–5:00pm",
	venue: "Westmead Simulation Centre",
	startDate: "2026-07-24T08:00:00+10:00",
	endDate: "2026-07-24T17:00:00+10:00",
};

export const freeSession = {
	shortDate: "Thu 25 June",
	time: "7:00pm",
	startDate: "2026-06-25T19:00:00+10:00",
	endDate: "2026-06-25T20:30:00+10:00",
};

export const courseDay = [
	{
		step: "Before",
		title: "Prepare with our resources",
		description:
			"The course manual and OSCE resources, plus a two-minute survey that helps us tailor the day to your group.",
	},
	{
		step: "Morning",
		title: "Trial OSCE stations",
		description:
			"Trial OSCE stations under exam conditions, with immediate examiner-style feedback.",
	},
	{
		step: "Afternoon",
		title: "Harder stations and coaching",
		description:
			"Harder stations with room-specific coaching from FACEM faculty. You’re videoed as you practise.",
	},
	{
		step: "After",
		title: "Feedback and follow-up",
		description:
			"Specific feedback on your recorded stations, plus a follow-up call 1–2 weeks later.",
	},
];

export const curriculum = [
	"Practical exam performance",
	"Communication",
	"Standardised Case-Based Discussions (SCBDs)",
	"Structured clinical reasoning",
	"Examiner-calibrated OSCE practice",
	"Exam tips, heuristics and performance strategies",
	"Trial stations reviewed for domain relevance and quality",
];

export const faqs = [
	{
		question: "Who is the course for?",
		answer:
			"ACEM trainees preparing for the Fellowship Clinical Examination (OSCE), whether it’s your first attempt or you’re resitting.",
	},
	{
		question: "Where is the in-person course held?",
		answer:
			"At the Simulation Centre (SiLECT), Level 3 WECC, Westmead Hospital, Cnr Hawkesbury Road and Darcy Rd, Westmead NSW 2145. The course runs from 8:00am to 5:00pm. Current dates are shown on our course page and on Humanitix.",
	},
	{
		question: "Can I pay in instalments?",
		answer:
			"Yes. Humanitix offers payment plans: reserve your place now and pay over time with automatic payments on a saved card, with no credit checks. Your ticket is released once the final payment is made.",
	},
	{
		question: "What do I get before the course?",
		answer:
			"The course manual, access to the Emergencypedia OSCE resource page, crash-course resources and a short pre-course survey.",
	},
	{
		question: "Is the Evening Taster recorded?",
		answer:
			"Yes. A recording and course materials are shared with registered participants after sign-up.",
	},
	{
		question: "What if I can’t attend?",
		answer:
			"Email acetheosce@gmail.com to discuss deferral or special circumstances.",
	},
];

export type CourseOption = {
	id: string;
	title: string;
	date: string;
	time?: string;
	venue: string;
	image: string;
	imageAlt: string;
	description: string[];
	highlights: string[];
	cta: string;
};

export const courseOptions: CourseOption[] = [
	{
		id: "online-session",
		title: "Evening Taster: Tips and Tricks",
		date: "Thursday, 25 June 2026",
		time: "7:00pm–8:30pm AEST",
		venue: "Online via Zoom",
		image: "/images/course/online-session.jpeg",
		imageAlt: "Online OSCE preparation session",
		description: [
			"A free online introduction to the course. Course co-director [Dr Laura Brown](faculty:laura-brown) leads a focused discussion on your approach to OSCE revision and exam day, with sample stations and practical advice on structuring your preparation.",
			"A recording and course materials are shared with registered participants after sign-up.",
		],
		highlights: [
			"Exam domain analysis",
			"Station type strategies",
			"Study techniques",
			"Interactive session",
			"Sample stations",
		],
		cta: "Register for free",
	},
	{
		id: "in-person-course",
		title: "In-Person Course",
		date: "Friday, 24 July 2026",
		time: "8:00am–5:00pm",
		venue: "Westmead Simulation Centre",
		image: "/images/course/in-person-course.jpg",
		imageAlt: "Faculty coaching candidates at an OSCE station",
		description: [
			"A full day of coached OSCE practice at the Westmead Simulation Centre, working directly with FACEM faculty experienced in OSCE preparation and exam success.",
			"You’re videoed at practice stations and get specific feedback afterwards, plus a follow-up call 1–2 weeks later.",
		],
		highlights: [
			"Realistic OSCE stations",
			"Immediate personalised feedback",
			"Small group environment",
			"Take-home video feedback",
			"Stations cross-checked by examiners",
		],
		cta: "Enrol now",
	},
];

export type FacultyMember = {
	name: string;
	role?: string;
	credentials?: string;
	image?: string;
	bio: string;
};

// URL fragment for a faculty member's About Us card, e.g. "Dr Úna Nic Ionmhain" -> "una-nic-ionmhain".
export function facultySlug(name: string) {
	return name
		.replace(/^(Dr|A\/Prof)\.?\s+/, "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export const faculty: FacultyMember[] = [
	{
		name: "Dr Khanh Nguyen",
		role: "Course Director",
		credentials:
			"FACEM, Senior Staff Specialist, DEMT, Director of Hospital Skills Program",
		image: "/images/faculty/khanh-nguyen.jpeg",
		bio: "Dr. Khanh Nguyen is an accomplished emergency physician in Sydney, NSW, working across multiple clinical sites. She is dedicated to advancing the next generation of specialists through her clinical, academic, and leadership roles. A founding member of Ace The OSCE, she is recognised for helping trainees succeed in the ACEM Fellowship OSCE. Dr. Nguyen serves as Director of the Hospital Skills Program and Program Director for the Master of Medicine (Critical Care) at the University of Sydney, where she is also a senior lecturer. She contributes nationally through the ACEM Assessment Working Group, shaping trainee assessment and standards.",
	},
	{
		name: "A/Prof Andrew Coggins",
		role: "Co-Director",
		credentials: "FACEM, Senior Staff Specialist, Director SiLECT",
		image: "/images/faculty/andrew-coggins.jpg",
		bio: "Andrew is an Emergency Physician from Scotland. After completing undergraduate studies at the University of Edinburgh, Andrew obtained FRCP and FACEM qualifications whilst living in Sydney. He worked in the prehospital setting for a year before taking on an education portfolio in Westmead Hospital, Sydney. Andrew enthusiastically teaches, promotes and publishes on clinical, education and simulation topics. Andrew holds an academic position at Sydney University.",
	},
	{
		name: "Dr Bibhu Pradhananga",
		role: "Co-Director",
		credentials: "FACEM, Senior Staff Specialist, Director of Training ICRP",
		image: "/images/faculty/bibhu-pradhananga.jpeg",
		bio: "Dr. Bibhu Pradhananga, FACEM, is a Senior Staff Specialist in Emergency Medicine, working across major Sydney hospitals. Originally from Nepal, he combines global insight with deep expertise in quality improvement, system efficiency, and integrating modern technology into healthcare. A founding member of ACE the OSCE, he has helped countless ACEM trainees excel in the Fellowship OSCE. As Director of Training for Concord Hospital’s ICRP Program, he mentors international medical graduates as they adapt to Australian practice. Beyond the ED, he is an avid whisky enthusiast, curating rare and distinctive expressions from around the world.",
	},
	{
		name: "Dr Laura Brown",
		role: "Co-Director",
		credentials:
			"FACEM, Staff Specialist with a focus on wellbeing and medical education",
		image: "/images/faculty/laura-brown.jpg",
		bio: "Dr Laura Brown is an emergency physician based in Sydney, NSW, working across both the public and private health systems. She is deeply passionate about teaching and supporting candidates preparing for their OSCE fellowship exams, with a particular focus on challenging communication stations. Laura’s approach is grounded in compassion, professionalism, and a commitment to sustainable medical careers. Her special interests include promoting workplace civility and fostering a culture of kindness in emergency medicine. Known for creating a safe space for learning, she encourages candidates to bring their most difficult personal and exam-related communication challenges to workshop together.",
	},
	{
		name: "Dr Úna Nic Ionmhain",
		credentials:
			"FACEM, Staff Specialist, Liverpool Hospital; Clinical Toxicologist, NSW Poisons Information Centre",
		image: "/images/faculty/una-nic-ionmhain.jpg",
		bio: "Dr. Úna Nic Ionmhain, FACEM, graduated from Trinity College Dublin before training in Emergency Medicine in Perth. She completed a Pre-Hospital and Retrieval Medicine year with CareFlight NSW and a poisons fellowship. Now a staff specialist at Liverpool Hospital and clinical toxicologist with the NSW Poisons Information Centre, she has a special interest in HIET for cardiogenic shock — the focus of her master’s thesis — and cardiotoxicity education. A passionate teacher, she balances her work with kayaking, running, and camping. A proud Irish speaker, she is also hopeful her wife will one day agree to getting a puppy.",
	},
	{
		name: "Dr Kerf Tan",
		credentials:
			"Emergency Physician, Auburn Hospital and The Children’s Hospital at Westmead",
		image: "/images/faculty/kerf-tan.jpg",
		bio: "Dr. Kerf Tan is a Sydney-based Emergency Physician and educator, holding appointments at Auburn Hospital and The Children’s Hospital at Westmead. With six years of consultant experience, he has a strong passion for medical education. Enthusiastic about technology and the future of healthcare, Kerf actively explores innovations in AI and digital health to enhance patient care and enrich the learning experience for future emergency physicians. Keep an eye out for his upcoming AI OSCE chatbot.",
	},
	{
		name: "Dr Susie Stapledon",
		credentials: "FACEM, Staff Specialist Concord, VMO Bankstown Hospital",
		bio: "Staff Specialist Concord, VMO Bankstown Hospital. FACEM",
	},
	{
		name: "Dr Sally Fares",
		credentials: "Emergency Medicine Staff Specialist, Royal Prince Alfred Hospital",
		image: "/images/faculty/sally-fares.jpg",
		bio: "Emergency Medicine Staff Specialist, Royal Prince Alfred Hospital. Hospital in the Home Staff Specialist, Sydney Local Health District.",
	},
	{
		name: "Dr Alexei Narushevich",
		credentials: "Senior Staff Specialist, Western Sydney",
		image: "/images/faculty/alexei-narushevich.jpeg",
		bio: "Dr. Narushevich is a Senior Staff Specialist based in Western Sydney and has been involved with the Ace the OSCE course since its early days. He has a particular interest in communication around life-limiting illnesses, end-of-life care, and the delivery of difficult news. Dr. Narushevich has presented at palliative care conferences and is actively engaged in education and governance across all levels of healthcare within the district. He is well known for his ability to navigate even the most challenging scenarios with insight and wit, when knowledge falls short, his experience and presence carry the day.",
	},
];

export const testimonials = [
	{
		quote:
			"Multiple stations under exam conditions was amazing. Forced to have a structure to entering a room I didn't think I would get anything right in. SCBDs were the most terrifying - in a good way! Really excellent to get immediate feedback instead of ruminating. Loved [Laura's](faculty:laura-brown) session, huge amount of intel in short space of time, well delivered.",
		attribution: "Course participant, 02/2022",
	},
	{
		quote:
			"The mentorship style. Reflecting on structure and most of all learning a strategy for how to use the prep time well and where to focus attention per domains.",
		attribution: "ACEM Fellow, 2022",
	},
	{
		quote:
			"I had been terrified of the OSCE because I didn't really have a framework for how to tackle preparing for it. [Dr Coggins'](faculty:andrew-coggins) insight around these stations has been very helpful.",
		attribution: "Course participant, 02/2022",
	},
];
