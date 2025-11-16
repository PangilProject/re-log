import { describe, it, expect } from 'vitest';
import type { Timestamp } from 'firebase/firestore';
import { formatDate } from '$lib/utils/formatDate';

describe('formatDate', () => {
	it('should return empty string when timestamp is undefined', () => {
		expect(formatDate(undefined)).toBe('');
	});

	it('should return empty string when timestamp is null', () => {
		expect(formatDate(null as any)).toBe('');
	});

	it('should format valid timestamp correctly', () => {
		const mockTimestamp = {
			toDate: () => new Date('2024-01-15T14:30:00Z')
		} as Timestamp;

		const result = formatDate(mockTimestamp);
		expect(result).toContain('2024');
		expect(result).toContain('1월');
		expect(result).toContain('15');
		expect(result).toContain('14:30');
	});

	it('should format timestamp with single digit day', () => {
		const mockTimestamp = {
			toDate: () => new Date('2024-01-05T09:05:00Z')
		} as Timestamp;

		const result = formatDate(mockTimestamp);
		expect(result).toContain('5');
		expect(result).toContain('09:05');
	});

	it('should format timestamp with double digit hour and minute', () => {
		const mockTimestamp = {
			toDate: () => new Date('2024-12-25T23:59:00Z')
		} as Timestamp;

		const result = formatDate(mockTimestamp);
		expect(result).toContain('12월');
		expect(result).toContain('23:59');
	});
});
