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

	return (
		<section className="relative overflow-hidden bg-linear-to-b from-tint to-white pt-36 pb-14 lg:pt-44 lg:pb-24">
			<div className="container mx-auto max-w-7xl px-6 lg:px-4 grid lg:grid-cols-12 gap-12 items-center">
				<div className="lg:col-span-7">
					<p className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
						{site.name} · Since {site.foundedYear}
					</p>
					<h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight_text leading-tight">
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
					<div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-2xl">
						<Image
							src="/images/hero.jpg"
							alt="Doctor in scrubs holding a stethoscope aloft on a coastal clifftop"
							fill
							priority
							sizes="(min-width: 1024px) 40vw, 100vw"
							className="object-cover"
						/>
					</div>
					<div className="relative -mt-12 mx-4 grid grid-cols-3 gap-3">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="rounded-2xl bg-white px-3 py-4 sm:px-4 shadow-xl border border-border text-center"
							>
								<p className="text-2xl sm:text-3xl font-bold text-primary">
									{stat.value}
								</p>
								<p className="mt-1 text-xs sm:text-sm text-black/70">
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
