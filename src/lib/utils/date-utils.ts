import { DateTime } from "luxon";

/**
 * Formats a UTC date string to a specific time zone and format.
 * By default, uses the user's local timezone, but allows specifying a different timezone.
 * @param params Object with utcDate, userTimezone (defaults to user's local timezone), and format.
 * @returns The formatted date string.
 * @example
 * formatDateTime({ utcDate: '2023-01-01T12:00:00Z', userTimezone: 'America/Lima', format: 'HH:mm' })
 */
export function formatDateTime({
	utcDate,
	userTimezone = DateTime.local().zoneName,
	format = "HH:mm",
}: {
	utcDate?: string;
	userTimezone?: string;
	format?: string;
}): string {
	const timezone = userTimezone || DateTime.local().zoneName;
	let targetDateTime: DateTime;
	if (utcDate) {
		// Parsear la fecha como UTC y convertir a la zona horaria del usuario
		targetDateTime = DateTime.fromISO(utcDate, { zone: "utc" }).setZone(
			timezone,
		);
	} else {
		// Si no hay fecha, usar la hora actual en la zona horaria del usuario
		targetDateTime = DateTime.now().setZone(timezone);
	}
	return targetDateTime.toFormat(format || "HH:mm");
}

/**
 * Formats a UTC date string for use in input fields (e.g., date pickers).
 * By default, uses the user's local timezone, but allows specifying a different timezone.
 * Tries multiple date formats if the initial parse fails.
 * @param params Object with utcDate, userTimezone (defaults to user's local timezone), and format.
 * @returns The formatted date string for input.
 * @example
 * formatDateForInput({ utcDate: '2023-01-01T12:00:00Z' })
 */
export function formatDateForInput({
	utcDate,
	userTimezone = DateTime.local().zoneName,
	format = "yyyy-MM-dd",
}: {
	utcDate: string;
	userTimezone?: string;
	format?: string;
}): string {
	let dateTime: DateTime;
	const timezone = userTimezone ?? DateTime.local().zoneName;

	// Intentar parsear como ISO UTC primero
	dateTime = DateTime.fromISO(utcDate, { zone: "utc" }).setZone(timezone);
	if (!dateTime.isValid) {
		// Intentar parsear como SQL UTC
		dateTime = DateTime.fromSQL(utcDate, { zone: "utc" }).setZone(timezone);
	}
	if (!dateTime.isValid) {
		// Intentar parsear como RFC2822 UTC
		dateTime = DateTime.fromRFC2822(utcDate, { zone: "utc" }).setZone(timezone);
	}

	if (!dateTime.isValid) {
		return "";
	}

	return dateTime.toFormat(format);
}

/**
 * Checks if the given date is the current day.
 * @param date Optional ISO date string (assumed to be UTC).
 * @param timezone Optional timezone (defaults to user's local timezone).
 * @returns True if the date is today, false otherwise.
 * @example
 * isCurrentDay('2023-01-01T12:00:00Z', 'America/Lima') // true or false
 */
export function isCurrentDay(
	date?: string,
	timezone: string = DateTime.local().zoneName,
) {
	const targetTimezone = timezone || DateTime.local().zoneName;
	const dateTime = date
		? DateTime.fromISO(date, { zone: "utc" }).setZone(targetTimezone)
		: DateTime.now().setZone(targetTimezone);
	const now = DateTime.now().setZone(targetTimezone);
	return dateTime.hasSame(now, "day");
}

/**
 * Calculates the difference in days between the given UTC ISO date and now, in the specified time zone.
 * By default, uses the user's local timezone, but allows specifying a different timezone.
 * @param utcIsoDate UTC ISO date string.
 * @param timezone Optional time zone string (defaults to user's local timezone).
 * @returns Number of days difference (rounded up).
 * @example
 * calculateDaysDifference('2023-01-10T12:00:00Z', 'America/Lima')
 */
export function calculateDaysDifference(
	utcIsoDate: string,
	timezone: string = DateTime.local().zoneName,
): number {
	const targetTimezone = timezone || DateTime.local().zoneName;
	const fechaObjetivo = DateTime.fromISO(utcIsoDate, { zone: "utc" }).setZone(
		targetTimezone,
	);
	const fechaActual = DateTime.now().setZone(targetTimezone);
	return Math.ceil(fechaObjetivo.diff(fechaActual, "days").days);
}

/**
 * Formats a UTC date string to a long date and time in Spanish locale.
 * By default, uses the user's local timezone, but allows specifying a different timezone.
 * @param utcDate UTC date string (ISO or SQL format).
 * @param userTimezone Optional user time zone (defaults to user's local timezone).
 * @returns Object with formatted fecha and hora strings.
 * @example
 * formatLongDateTime('2023-01-01T12:00:00Z', 'America/Lima')
 */
export function formatLongDateTime(
	utcDate: string,
	userTimezone: string = DateTime.local().zoneName,
): { fecha: string; hora: string } {
	const timezone = userTimezone ?? DateTime.local().zoneName;

	// Intentar parsear como ISO UTC primero, luego como SQL UTC
	let utcDateTime = DateTime.fromISO(utcDate, { zone: "utc" });
	if (!utcDateTime.isValid) {
		utcDateTime = DateTime.fromSQL(utcDate, { zone: "utc" });
	}

	const userDateTime = utcDateTime.setZone(timezone).setLocale("es");

	return {
		fecha: userDateTime.toFormat("dd 'de' MMMM 'de' yyyy"),
		hora: userDateTime.toFormat("HH:mm:ss 'hrs'"),
	};
}

/**
 * Determines if a date is in the past, present, or future relative to today in the given time zone.
 * By default, uses the user's local timezone, but allows specifying a different timezone.
 * @param params Object with date (dd/MM/yyyy format) and optional timeZone (defaults to user's local timezone).
 * @returns 'PAST', 'PRESENT', or 'FUTURE'.
 * @example
 * getTemporalStatus({ date: '01/01/2023', timeZone: 'America/Lima' })
 */
export function getTemporalStatus({
	date,
	timeZone = DateTime.local().zoneName,
}: {
	date: string;
	timeZone?: string;
}): "PAST" | "PRESENT" | "FUTURE" {
	const targetTimezone = timeZone || DateTime.local().zoneName;
	const fechaObjetivo = DateTime.fromFormat(date, "dd/MM/yyyy")
		.setZone(targetTimezone)
		.startOf("day");
	const ahora = DateTime.now().setZone(targetTimezone).startOf("day");

	if (!fechaObjetivo.isValid) {
		console.error("Fecha inválida:", date);
		return "PAST";
	}

	const diffDays = fechaObjetivo.diff(ahora, "days").days;

	if (diffDays === 0) {
		return "PRESENT";
	}

	return diffDays < 0 ? "PAST" : "FUTURE";
}

/**
 * Checks if a UTC date is within a given UTC range (inclusive start, exclusive end).
 * @param params Object with utcDate, utcStartDate, utcEndDate, optional timezone for comparison, and optional ignoreTime.
 * @returns True if date is in range, false otherwise.
 * @example
 * isDateInRange({ utcDate: '2024-06-10T12:00:00Z', utcStartDate: '2024-06-01T00:00:00Z', utcEndDate: '2024-06-30T23:59:59Z' })
 */
export function isDateInRange({
	utcDate,
	utcStartDate,
	utcEndDate,
	timezone = DateTime.local().zoneName,
	ignoreTime = false,
}: {
	utcDate: string;
	utcStartDate: string;
	utcEndDate: string;
	timezone?: string;
	ignoreTime?: boolean;
}): boolean {
	if (!utcDate || !utcStartDate || !utcEndDate) return false;

	const targetTimezone = timezone || DateTime.local().zoneName;

	let dt = DateTime.fromISO(utcDate, { zone: "utc" }).setZone(targetTimezone);
	let start = DateTime.fromISO(utcStartDate, { zone: "utc" }).setZone(
		targetTimezone,
	);
	let end = DateTime.fromISO(utcEndDate, { zone: "utc" }).setZone(
		targetTimezone,
	);

	if (ignoreTime) {
		dt = dt.startOf("day");
		start = start.startOf("day");
		end = end.startOf("day");
	}

	if (!dt.isValid || !start.isValid || !end.isValid) return false;

	return dt >= start && dt < end;
}
