import { Tabs as MTabs } from '@mantine/core';
import type { FC } from 'react';

interface TabsProps {
    tabs: Array<{
        key: string;
        node: React.ReactNode;
        icon?: React.ReactNode;
        active?: boolean;
    }>;
}
export const Tabs: FC<TabsProps> = ({ tabs }) => {
    return (
        <MTabs defaultValue={tabs[0].key}>
            <MTabs.List>
                {tabs.map((tab) => (
                    <MTabs.Tab
                        key={tab.key}
                        value={tab.key}
                        leftSection={tab.icon}
                    >
                        {tab.key}
                    </MTabs.Tab>
                ))}
            </MTabs.List>
            {tabs.map((tab) => (
                <MTabs.Panel key={tab.key} value={tab.key} className="p-2">
                    {tab.node}
                </MTabs.Panel>
            ))}
        </MTabs>
    );
};
