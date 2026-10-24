// Facts about the ACEM Fellowship Clinical Examination, taken from ACEM's
// Examinations page. Re-check against the source before each sitting.
export const osceSource = {
	url: "https://acem.org.au/Content-Sources/Training/How-the-FACEM-Training-Program-works/Examinations",
	resourcesUrl: "https://elearning.acem.org.au/course/view.php?id=652",
	lastChecked: "25 October 2026",
	lastCheckedIso: "2026-10-25",
};

export const keyFacts = [
	{ value: "12", label: "Stations" },
	{ value: "11 min", label: "Per station (4 reading + 7 assessment)" },
	{ value: "2 days", label: "Held over two consecutive days" },
	{ value: "4", label: "Maximum attempts" },
];

export const stationTypes = [
	"History taking",
	"Physical examination",
	"A challenging communication station: patient, relative or staff member",
	"Resus Standardised Case-Based Discussion",
	"Teaching or advice to junior staff",
	"Standardised Case-Based Discussion (SCBD)",
];

export const eligibility = [
	"Be an enrolled ACEM trainee with no financial debts to the College",
	"Hold current registration to practise medicine in Australia or Aotearoa New Zealand",
	"Have progressed to Training Stage 4 (the OSCE can be sat at any time during Stage 4)",
	"Have completed the online Clinical Leadership module",
	"Have completed the Paediatric Emergency Requirement (PER)",
	"Not be on a Wellbeing Interruption to Training from application through to the sitting dates",
];

export const sittings = [
	{
		sitting: "2026.2",
		dates: "8–11 and 15–16 September 2026",
		location: "AMC-NTC, Melbourne",
		applicationsOpen: "15 June 2026",
		applicationsClose: "10 July 2026",
		eligibilityDeadline: "10 August 2026",
	},
	{
		sitting: "2027.1",
		dates: "16–19 March 2027",
		location: "Cliftons, Sydney",
		applicationsOpen: "14 December 2026",
		applicationsClose: "29 January 2027",
		eligibilityDeadline: "8 February 2027",
	},
	{
		sitting: "2027.2",
		dates: "7–10 September 2027",
		location: "Cliftons, Sydney",
		applicationsOpen: "7 June 2027",
		applicationsClose: "9 July 2027",
		eligibilityDeadline: "9 August 2027",
	},
];

export const examFee = "AUD $4,450";

export const guideFaqs = [
	{
		question: "How many stations are in the ACEM OSCE?",
		answer:
			"Up to 12 clinical stations, based on scenarios you would expect to see in the emergency department. There is at least one of each station type: history taking, physical examination, challenging communication, Resus SCBD, teaching or advice to junior staff, and SCBD.",
	},
	{
		question: "How long is each OSCE station?",
		answer:
			"Each station is 11 minutes: 4 minutes of reading time followed by 7 minutes of assessment. That is 132 minutes of stations in total, spread over two consecutive days.",
	},
	{
		question: "When can I sit the OSCE?",
		answer:
			"At any time during Training Stage 4, once you meet the eligibility requirements by the eligibility deadline for your chosen sitting.",
	},
	{
		question: "How many attempts do I get?",
		answer:
			"A maximum of four. Each attempt needs a new application and fee. A trainee who is unsuccessful on their final attempt may be considered for removal from the training program.",
	},
	{
		question: "How much does the OSCE cost?",
		answer: `The current exam fee is ${examFee} per attempt.`,
	},
	{
		question: "Can I withdraw after applying?",
		answer:
			"The withdrawal cut-off is the application close date, unless exceptional circumstances apply. Withdrawals are made through ACEM’s online form.",
	},
];
