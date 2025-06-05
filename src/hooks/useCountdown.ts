import { useCallback } from "react";
import { useBoolean, useInterval, useNumber } from "react-use";

interface CountdownOptions {
	countStart: number;
	countStop?: number;
	intervalMs?: number;
	isIncrement?: boolean;
	autoStart?: boolean;
}

interface CountdownControllers {
	startCountdown: () => void;
	stopCountdown: () => void;
	resetCountdown: () => void;
}

/**
 * useCountdown
 * ---------------------------------------------
 * Custom React hook for creating a countdown or count-up timer with start, stop, and reset controls.
 * Supports incrementing or decrementing, configurable interval, and optional auto start.
 * Returns the current count and controller functions.
 *
 * @example
 * const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
 *   countStart: 10,
 *   countStop: 0,
 *   intervalMs: 1000,
 *   isIncrement: false,
 *   autoStart: true,
 * });
 */
export function useCountdown({
	countStart,
	countStop = 0,
	intervalMs = 1000,
	isIncrement = false,
	autoStart = false,
}: CountdownOptions): [number, CountdownControllers] {
	const [count, { inc, dec, set }] = useNumber(countStart);
	const [isCountdownRunning, setIsCountdownRunning] = useBoolean(autoStart);

	const startCountdown = useCallback(() => {
		setIsCountdownRunning(true);
	}, [setIsCountdownRunning]);

	const stopCountdown = useCallback(() => {
		setIsCountdownRunning(false);
	}, [setIsCountdownRunning]);

	const resetCountdown = useCallback(() => {
		stopCountdown();
		set(countStart);
	}, [countStart, set, stopCountdown]);

	useInterval(
		() => {
			if (count === countStop) {
				stopCountdown();
				return;
			}

			if (isIncrement) {
				inc();
			} else {
				dec();
			}
		},
		isCountdownRunning ? intervalMs : null,
	);

	return [count, { startCountdown, stopCountdown, resetCountdown }];
}
