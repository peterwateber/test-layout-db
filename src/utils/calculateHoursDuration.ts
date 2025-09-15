/**
 * Calculates the duration in hours between two dates.
 *
 * This function handles both positive and negative time differences, always
 * returning a non-negative value. Note: It works correctly regardless of the order
 * of the input dates.
 */
export const calculateHoursDuration = (
    startDate: string,
    endDate: string
): number => {
    // Use getTime() to get the number of milliseconds since the Unix Epoch
    const startTimeMs = new Date(startDate).getTime();
    const endTimeMs = new Date(endDate).getTime();

    // Calculate the absolute difference in milliseconds
    const differenceInMs = Math.abs(endTimeMs - startTimeMs);

    // Define the conversion factor for milliseconds to hours
    const msInHour = 1000 * 60 * 60; // 3,600,000

    // Convert the millisecond difference to hours
    const differenceInHours = differenceInMs / msInHour;

    return differenceInHours;
};
