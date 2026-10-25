// Fetches the site's published content from Sanity into content/site-content.json.
// Runs before `next build` and `next dev` (see package.json), so pages read plain JSON
// and stay fully static. Publishing in Sanity triggers a Vercel deploy, which runs this
// again.
import { mkdir, writeFile } from "node:fs/promises";

const PROJECT_ID = "f3et2lbb";
const DATASET = "production";
const API_VERSION = "2025-02-19";
const OUTPUT = new URL("../content/site-content.json", import.meta.url);

// Documents that exist exactly once; the build fails if any is missing.
const SINGLETONS = [
	"courseDates",
	"inPersonCourse",
	"eveningTaster",
	"homePage",
	"coursePage",
	"osceGuidePage",
	"aboutPage",
	"contactPage",
	"privacyPage",
	"notFoundPage",
	"courseOptionsSection",
	"testimonialsSection",
	"callToAction",
	"header",
	"footer",
	"contactForm",
	"siteSettings",
];
const COLLECTIONS = ["faculty", "testimonial"];

// Published documents only. The live API rather than the CDN, so a build triggered by a
// publish never reads a stale copy.
async function query(groq) {
	const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?perspective=published`;
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query: groq }),
	});
	if (!response.ok) {
		throw new Error(
			`Sanity query failed: ${response.status} ${await response.text()}`,
		);
	}
	return (await response.json()).result;
}

const SYSTEM_FIELDS = new Set(["_rev", "_createdAt", "_updatedAt", "_system"]);

// Replaces every {_ref} with the document or image it points to, so components never
// have to look anything up.
function resolve(value, byId) {
	if (Array.isArray(value)) return value.map((item) => resolve(item, byId));
	if (!value || typeof value !== "object") return value;
	if (value._ref) {
		const target = byId.get(value._ref);
		if (!target)
			throw new Error(
				`Sanity content links to a missing document: ${value._ref}`,
			);
		return {
			...(value._key && { _key: value._key }),
			...resolve(target, byId),
		};
	}
	return Object.fromEntries(
		Object.entries(value)
			.filter(([key]) => !SYSTEM_FIELDS.has(key))
			.map(([key, item]) => [key, resolve(item, byId)]),
	);
}

const [documents, images] = await Promise.all([
	query(`*[_type in ${JSON.stringify([...SINGLETONS, ...COLLECTIONS])}]`),
	query(
		`*[_type == "sanity.imageAsset"]{_id, url, "width": metadata.dimensions.width, "height": metadata.dimensions.height}`,
	),
]);

const byId = new Map([...documents, ...images].map((doc) => [doc._id, doc]));
const missing = SINGLETONS.filter((id) => !byId.has(id));
if (missing.length) {
	throw new Error(
		`Missing in Sanity (publish them first): ${missing.join(", ")}`,
	);
}

const content = Object.fromEntries(
	SINGLETONS.map((id) => [id, resolve(byId.get(id), byId)]),
);
for (const type of COLLECTIONS) {
	content[type] = documents
		.filter((doc) => doc._type === type)
		.map((doc) => resolve(doc, byId));
}

await mkdir(new URL(".", OUTPUT), { recursive: true });
await writeFile(OUTPUT, `${JSON.stringify(content, null, "\t")}\n`);
console.log(
	`Fetched ${documents.length} documents from Sanity into content/site-content.json`,
);
