import Image from "next/image";
import Link from "next/link";
import {
	ArrowRightIcon,
	CalendarIcon,
	CheckIcon,
	ClockIcon,
	MapPinIcon,
} from "@/components/icons";
import { freeSession, nextCourse, site, stats } from "@/lib/content";
import { getSchedule } from "@/lib/schedule";

// Home page hero: text on the left, a mosaic of photo and stat tiles on the right (modelled
// on the HealthPoint template's banner), and a swipeable photo row on phones.

const photos = {
	main: {
		src: "/images/simulation-training.jpeg",
		alt: "Emergency team running a resuscitation simulation on a manikin while a colleague holds up a “Quiet please” sign",
	},
	recorded: {
		src: "/images/hero/recorded-station.jpg",
		alt: "A station being recorded on a laptop for video feedback",
	},
	communication: {
		src: "/images/hero/communication-seated.jpg",
		alt: "A candidate and a role-player face to face during a communication station",
	},
	group: {
		src: "/images/hero/group-scenario.jpg",
		alt: "Candidates and faculty discussing a scenario around a manikin on a trolley",
	},
};

// Small photos get a light teal wash, like the template's tinted tiles.
function TintedPhoto({ src, alt, className }: { src: string; alt: string; className: string }) {
	return (
		<div className={`overflow-hidden ${className}`}>
			<Image
				src={src}
				alt={alt}
				fill
				sizes="12vw"
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
	stat: { value: string; label: string };
	className: string;
}) {
	return (
		<div className={`flex flex-col justify-end p-3.5 xl:p-4 text-white ${className}`}>
			<p className="text-2xl xl:text-3xl font-bold leading-none">{stat.value}</p>
			<p className="mt-1.5 min-h-[2lh] text-sm leading-snug text-white/85">{stat.label}</p>
		</div>
	);
}

export default async function Hero() {
	const { inPersonUpcoming, tasterUpcoming } = await getSchedule();
	const keyFacts = [
		{
			icon: CalendarIcon,
			text: inPersonUpcoming
				? `${nextCourse.shortDate} · ${nextCourse.time}`
				: "Next course dates coming soon",
		},
		{ icon: MapPinIcon, text: `${nextCourse.venue}, Sydney` },
		{ icon: CheckIcon, text: "Payment plans available" },
		...(tasterUpcoming
			? [
					{
						icon: ClockIcon,
						text: `Free online Evening Taster · ${freeSession.shortDate}, ${freeSession.time}`,
					},
				]
			: []),
	];
	const [years, courses, attendees] = stats;

	return (
		<section className="relative overflow-hidden bg-linear-to-b from-tint to-white pt-36 pb-14 lg:flex lg:flex-col lg:justify-center lg:min-h-[calc(6rem+30vw)] 2xl:min-h-[calc(6rem+min(33vw,645px))] lg:pt-32 lg:pb-8">
			{/* Decorative photo at the far left, only where the margin beside the text is wide enough. */}
			<TintedPhoto
				{...photos.recorded}
				className="absolute left-0 top-24 hidden 2xl:block size-32 min-[1680px]:size-44"
			/>

			<div className="container mx-auto max-w-7xl px-6 lg:px-4 grid lg:grid-cols-12 gap-12 items-center">
				<div className="lg:col-span-7">
					<p className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
						{site.name} · Since {site.foundedYear}
					</p>
					<h1 className="mt-6 text-4xl sm:text-5xl font-bold text-midnight_text leading-tight">
						Pass the ACEM Fellowship OSCE with confidence
					</h1>
					<p className="mt-6 max-w-xl text-xl text-black/70">
						A small-group, in-person course at the Westmead Simulation Centre,
						run by FACEM educators.
					</p>
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
								href={site.enrolUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-primary border border-primary px-6 py-3 rounded-lg text-white text-lg hover:bg-primary-dark"
							>
								Enrol now
								<ArrowRightIcon className="h-5 w-5" />
							</a>
						) : (
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 bg-primary border border-primary px-6 py-3 rounded-lg text-white text-lg hover:bg-primary-dark"
							>
								Register your interest
								<ArrowRightIcon className="h-5 w-5" />
							</Link>
						)}
						<Link
							href="/course"
							className="inline-flex items-center px-6 py-3 rounded-lg border border-primary text-primary text-lg hover:bg-primary hover:text-white"
						>
							View course details
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
							{[photos.main, photos.communication, photos.recorded, photos.group].map(
								(photo, i) => (
									<li
										key={photo.src}
										className="relative aspect-4/3 w-[85%] max-w-xl shrink-0 snap-start overflow-hidden rounded-3xl shadow-lg"
									>
										<Image
											src={photo.src}
											alt={photo.alt}
											fill
											priority={i === 0}
											sizes="85vw"
											className={`object-cover ${i === 0 ? "object-[60%_50%]" : ""}`}
										/>
									</li>
								),
							)}
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
				<TintedPhoto {...photos.group} className="relative col-start-2 row-start-1" />
				<StatTile stat={years} className="col-start-4 row-start-1 bg-primary/75" />
				<div className="relative col-start-2 col-span-2 row-start-2 row-span-2 overflow-hidden">
					<Image
						src={photos.main.src}
						alt={photos.main.alt}
						fill
						priority
						sizes="(min-width: 1960px) 430px, (min-width: 1536px) 22vw, 20vw"
						className="object-cover object-[60%_50%]"
					/>
				</div>
				<TintedPhoto {...photos.communication} className="relative col-start-4 row-start-2" />
				<StatTile stat={attendees} className="col-start-1 row-start-3 bg-primary" />
				<StatTile stat={courses} className="col-start-4 row-start-3 bg-primary-dark" />
			</div>
		</section>
	);
}
