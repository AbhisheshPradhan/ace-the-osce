import Image from "next/image";
import Link from "next/link";
import {
	ArrowRightIcon,
	CalendarIcon,
	CheckIcon,
	ClockIcon,
	MapPinIcon,
} from "@/components/icons";
import {
	formatShortDate,
	formatTime,
	formatTimeRange,
	getContent,
	type ImageWithAlt,
	imageUrl,
} from "@/lib/cms";
import { getSchedule } from "@/lib/schedule";

// Home page hero: text on the left, a mosaic of photo and stat tiles on the right (modelled
// on the HealthPoint template's banner), and a swipeable photo row on phones. Wording, photos
// and stats come from Home → Hero in Sanity; dates and the booking link from Dates and booking.

// Keeps the editor's focus point (hotspot) in view when a photo is cropped by its tile.
function focus(image: ImageWithAlt) {
	const { x = 0.5, y = 0.5 } = image.hotspot ?? {};
	return { objectPosition: `${x * 100}% ${y * 100}%` };
}

// Small photos get a light teal wash, like the template's tinted tiles.
function TintedPhoto({ image, className }: { image?: ImageWithAlt; className: string }) {
	if (!image) return null;
	return (
		<div className={`overflow-hidden ${className}`}>
			<Image
				src={imageUrl(image, { width: 600 })}
				alt={image.alt}
				fill
				sizes="12vw"
				style={focus(image)}
				className="object-cover saturate-50 brightness-110"
			/>
			<div aria-hidden="true" className="absolute inset-0 bg-primary/25" />
		</div>
	);
}

function StatTile({
	stat,
	className,
}: {
	stat?: { value: string; label: string };
	className: string;
}) {
	if (!stat) return null;
	return (
		<div className={`flex flex-col justify-end p-3.5 xl:p-4 text-white ${className}`}>
			<p className="text-2xl xl:text-3xl font-bold leading-none">{stat.value}</p>
			<p className="mt-1.5 min-h-[2lh] text-sm leading-snug text-white/85">{stat.label}</p>
		</div>
	);
}

export default async function Hero() {
	const { homePage, courseDates, inPersonCourse } = await getContent();
	const { hero } = homePage;
	const { inPerson, taster } = courseDates;
	const { inPersonUpcoming, tasterUpcoming } = await getSchedule();
	const keyFacts = [
		{
			icon: CalendarIcon,
			text: inPersonUpcoming
				? `${formatShortDate(inPerson.startDate)} · ${formatTimeRange(inPerson.startDate, inPerson.endDate)}`
				: hero.noDatesText,
		},
		{ icon: MapPinIcon, text: inPersonCourse.venue },
		{ icon: CheckIcon, text: hero.paymentNote },
		...(tasterUpcoming
			? [
					{
						icon: ClockIcon,
						text: `${hero.tasterLabel} · ${formatShortDate(taster.startDate, { year: false })}, ${formatTime(taster.startDate)}`,
					},
				]
			: []),
	].filter((fact) => fact.text);
	const [years, courses, attendees] = hero.stats ?? [];
	// Phones show every photo in a swipeable row, main photo first.
	const carousel = [hero.image, hero.sideImage, hero.topImage, hero.cornerImage].filter(
		(image): image is ImageWithAlt => Boolean(image),
	);

	return (
		<section className="relative overflow-hidden bg-linear-to-b from-tint to-white pt-36 pb-14 lg:flex lg:flex-col lg:justify-center lg:min-h-[calc(6rem+30vw)] 2xl:min-h-[calc(6rem+min(33vw,645px))] lg:pt-32 lg:pb-8">
			{/* Decorative photo at the far left, only where the margin beside the text is wide enough. */}
			<TintedPhoto
				image={hero.cornerImage}
				className="absolute left-0 top-24 hidden 2xl:block size-32 min-[1680px]:size-44"
			/>

			<div className="container mx-auto max-w-7xl px-6 lg:px-4 grid lg:grid-cols-12 gap-12 items-center">
				<div className="lg:col-span-7">
					{hero.eyebrow && (
						<p className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
							{hero.eyebrow}
						</p>
					)}
					<h1 className="mt-6 text-4xl sm:text-5xl font-bold text-midnight_text leading-tight">
						{hero.heading}
					</h1>
					{hero.subheading && (
						<p className="mt-6 max-w-xl text-xl text-black/70">{hero.subheading}</p>
					)}
					<ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3">
						{keyFacts.map(({ icon: Icon, text }) => (
							<li
								key={text}
								className="flex items-start gap-2 font-medium text-midnight_text"
							>
								<Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
								{text}
							</li>
						))}
					</ul>
					<div className="mt-10 flex flex-wrap gap-4">
						{inPersonUpcoming ? (
							<a
								href={courseDates.bookingUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-primary border border-primary px-6 py-3 rounded-lg text-white text-lg hover:bg-primary-dark"
							>
								{inPersonCourse.ctaLabel}
								<ArrowRightIcon className="h-5 w-5" />
							</a>
						) : (
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 bg-primary border border-primary px-6 py-3 rounded-lg text-white text-lg hover:bg-primary-dark"
							>
								{hero.noDatesButtonLabel}
								<ArrowRightIcon className="h-5 w-5" />
							</Link>
						)}
						<Link
							href="/course"
							className="inline-flex items-center px-6 py-3 rounded-lg border border-primary text-primary text-lg hover:bg-primary hover:text-white"
						>
							{hero.detailsButtonLabel}
						</Link>
					</div>
				</div>

				<div className="lg:col-span-5">
					{/* Phones and tablets: a swipeable row of photos (CSS scroll-snap, no JS), with the
					    next photo peeking in, and the stats underneath. */}
					<div className="lg:hidden">
						<ul
							aria-label="Photos from the course"
							tabIndex={0}
							className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
						>
							{carousel.map((image, i) => (
								<li
									key={image.asset.url}
									className="relative aspect-4/3 w-[85%] max-w-xl shrink-0 snap-start overflow-hidden rounded-3xl shadow-lg"
								>
									<Image
										src={imageUrl(image, { width: 1200 })}
										alt={image.alt}
										fill
										priority={i === 0}
										sizes="85vw"
										style={focus(image)}
										className="object-cover"
									/>
								</li>
							))}
						</ul>
						<div className="mt-3 grid grid-cols-3 gap-3">
							<StatTile stat={years} className="rounded-2xl bg-primary/75" />
							<StatTile stat={courses} className="rounded-2xl bg-primary" />
							<StatTile stat={attendees} className="rounded-2xl bg-primary-dark" />
						</div>
					</div>
				</div>
			</div>

			{/* Desktop: a 4 × 3 grid of square cells pinned under the header and against the right
			    edge, like the template; empty cells show the background. */}
			<div className="absolute top-24 right-0 hidden lg:grid w-[40vw] 2xl:w-[min(44vw,860px)] aspect-4/3 grid-cols-4 grid-rows-3">
				<TintedPhoto image={hero.topImage} className="relative col-start-2 row-start-1" />
				<StatTile stat={years} className="col-start-4 row-start-1 bg-primary/75" />
				<div className="relative col-start-2 col-span-2 row-start-2 row-span-2 overflow-hidden">
					<Image
						src={imageUrl(hero.image, { width: 1000 })}
						alt={hero.image.alt}
						fill
						priority
						sizes="(min-width: 1960px) 430px, (min-width: 1536px) 22vw, 20vw"
						style={focus(hero.image)}
						className="object-cover"
					/>
				</div>
				<TintedPhoto image={hero.sideImage} className="relative col-start-4 row-start-2" />
				<StatTile stat={attendees} className="col-start-1 row-start-3 bg-primary" />
				<StatTile stat={courses} className="col-start-4 row-start-3 bg-primary-dark" />
			</div>
		</section>
	);
}
