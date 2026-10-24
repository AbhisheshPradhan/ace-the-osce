type IconProps = { className?: string };

function Icon({
	className,
	children,
}: IconProps & { children: React.ReactNode }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className ?? "h-5 w-5"}
		>
			{children}
		</svg>
	);
}

export function CheckIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M5 12l5 5L20 7" />
		</Icon>
	);
}

export function ArrowRightIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M5 12h14M13 6l6 6l-6 6" />
		</Icon>
	);
}

export function CalendarIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM16 3v4M8 3v4M4 11h16" />
		</Icon>
	);
}

export function ClockIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 3" />
		</Icon>
	);
}

export function MapPinIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
			<path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
		</Icon>
	);
}

export function MailIcon(props: IconProps) {
	return (
		<Icon {...props}>
			<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<path d="M3 7l9 6l9-6" />
		</Icon>
	);
}

export function StarIcon({ className }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			className={className ?? "h-5 w-5"}
		>
			<path d="M12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
		</svg>
	);
}
