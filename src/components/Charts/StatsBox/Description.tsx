import { Box, Group, SimpleGrid, Text } from '@mantine/core';
import type { FC } from 'react';
import type { StatBoxType } from '../../../api/types';

export const Description: FC<{ activity: StatBoxType[] }> = ({ activity }) => {
    return (
        <>
            <Text
                c="dimmed"
                fz="sm"
                pb={5}
                mt={5}
                className="border-b-2 border-b-gray-200"
            >
                Your top activities
            </Text>
            <SimpleGrid cols={{ base: 1, xs: 3 }} mt={10}>
                {activity.map(
                    (stat, index) =>
                        index < 3 && (
                            <Box
                                key={stat.name}
                                style={{ borderBottomColor: stat.color }}
                                className="stat"
                            >
                                <Text
                                    tt="uppercase"
                                    fz="xs"
                                    c="dimmed"
                                    fw={700}
                                    className="overflow-hidden whitespace-nowrap truncate"
                                >
                                    {stat.name}
                                </Text>

                                <Group
                                    justify="space-between"
                                    align="flex-end"
                                    gap={0}
                                >
                                    <Text fw={700}>{stat.duration}h</Text>
                                    <Text
                                        c={stat.color}
                                        fw={700}
                                        size="sm"
                                        className="statCount"
                                    >
                                        {stat.percentage}%
                                    </Text>
                                </Group>
                            </Box>
                        )
                )}
            </SimpleGrid>
        </>
    );
};
