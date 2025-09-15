import { Group, Text } from '@mantine/core';
import { IconDeviceAnalytics } from '@tabler/icons-react';
import type { FC } from 'react';
import type { ReportItem } from '../../../api/types';
import { calculatePercentage } from '../../../utils/calculatePercentage';
import { Description } from './Description';

interface StatsBoxProps {
    data?: ReportItem[];
}

export const StatsBox: FC<StatsBoxProps> = ({ data }) => {
    const activity = calculatePercentage(data || []);

    if (!data || !data.length) return null;

    return (
        <div>
            <Group justify="space-between">
                <Group align="flex-end" gap="xs">
                    <Text fz="md" fw={700}>
                        Total:
                    </Text>
                    <Text c="teal" className="diff" fz="md" fw={700}>
                        <span>
                            {activity.reduce(
                                (sum, item) => sum + item.duration,
                                0
                            )}{' '}
                            hours
                        </span>
                    </Text>
                </Group>
                <IconDeviceAnalytics size={22} className="icon" stroke={1.5} />
            </Group>

            <Description activity={activity} />

            {/* <Progress.Root
                size={34}
                classNames={{ label: 'progressLabel' }}
                mt={10}
            >
                {activity?.map((segment, index) => (
                    <Progress.Section
                        value={segment.percentage}
                        color={segment.color}
                        key={segment.color}
                    >
                        <Text c="white">
                            {index === 0 ? `${segment.percentage}%` : ''}
                        </Text>
                    </Progress.Section>
                ))}
            </Progress.Root> */}
        </div>
    );
};
