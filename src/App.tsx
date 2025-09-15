import { Grid, Paper } from '@mantine/core';
import { IconBox } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { authenticate } from './api/authenticate';
import { postReport } from './api/postReport';
import type { ReportItem } from './api/types';
import { AppContextProvider } from './AppContext';
import { SimpleBarChart, SimplePieChart, StatsBox, Tabs } from './components';
import { SkeletonLoader } from './components/SkeletonLoader';
import { ReportTable } from './features';
import { Filter } from './features/Filter/Filter';
import type { RootState } from './store';
import { getToken } from './utils/tokenStorage';

export default function App() {
    const { startDate, endDate } = useSelector((s: RootState) => s.filters);

    /**
     * This auto-fetches once the env variables keys are set accordingly.
     * Ignores the query when there's already a token set.
     */
    const { isLoading: isLoadingAuth, isFetching: isFetchingAuth } = useQuery({
        queryKey: ['authenticate'],
        queryFn: async () => authenticate(),
    });

    const {
        data: entries,
        isLoading: isLoadingReport,
        isEnabled,
    } = useQuery<ReportItem[]>({
        queryKey: ['getReport', startDate, endDate],
        queryFn: async () => await postReport(startDate, endDate),
        enabled: Boolean(getToken()),
    });

    const tabs = useMemo(
        () => [
            {
                key: 'Stats',
                node: (
                    <>
                        <StatsBox data={entries || []} />
                        <SimplePieChart data={entries || []} />
                    </>
                ),
                icon: <IconBox size={12} />,
                active: true,
            },
        ],
        [entries]
    );

    return (
        <AppContextProvider
            value={{
                isLoading: isLoadingAuth || isLoadingReport,
                entries: entries || [],
            }}
        >
            <div className="app">
                <Filter />

                {isLoadingAuth || isFetchingAuth ? (
                    <>
                        <SkeletonLoader />
                    </>
                ) : (
                    <main>
                        <section className="charts">
                            <Grid>
                                <Grid.Col span={8}>
                                    <Paper
                                        shadow="xs"
                                        p="xs"
                                        className="h-[100%]"
                                    >
                                        <div className="chart">
                                            <h3 className="text-md font-semibold pb-2">
                                                Top projects (hours)
                                            </h3>
                                            {isEnabled &&
                                                Boolean(entries?.length) && (
                                                    <SimpleBarChart
                                                        data={entries || []}
                                                    />
                                                )}
                                        </div>
                                    </Paper>
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Paper shadow="xs">
                                        {isEnabled && <Tabs tabs={tabs} />}
                                    </Paper>
                                </Grid.Col>
                            </Grid>
                        </section>

                        <Paper shadow="xs" p="xs">
                            <section>
                                <ReportTable
                                    entries={entries || []}
                                    isLoading={isLoadingReport}
                                />
                            </section>
                        </Paper>
                    </main>
                )}
            </div>
        </AppContextProvider>
    );
}
