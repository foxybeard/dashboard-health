import React, { useState, useEffect } from 'react'; // <-- добавляем useState и useEffect
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import type { ServiceData } from 'src/types/ServiceData';

import { DashboardContent } from 'src/layouts/dashboard';
// Импорты карточек и прочих компонентов остаются
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
// Другие импорты (например, _tasks, _posts, _timeline) можно убрать, если больше не нужны

// Импортируем типы данных сервиса (создадим его в следующем шаге)

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('https://testapi.io/api/foxybeard/services')
            .then(response => response.json())
            .then((data: ServiceData[]) => {
                setServices(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <DashboardContent maxWidth="xl">
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                Core Domain Services - synthetic health dashboard
            </Typography>

            {isLoading ? (
                <Typography variant="body1">Loading services...</Typography>
            ) : (
                <Grid container spacing={3}>
                    {services.map(service => (
                        <Grid key={service.id} xs={12} sm={6} md={3}>
                            <AnalyticsWidgetSummary
                                title={service.name}
                                total={Number(service.totalDuration)}
                                status={service.status}
                                // Исправленный маппинг: unknown → 'info'
                                color={
                                    service.status === 'healthy'
                                        ? 'success'
                                        : service.status === 'degraded'
                                            ? 'warning'
                                            : service.status === 'unhealthy'
                                                ? 'error'
                                                : 'info'
                                }
                                icon={<img alt="icon" src={service.icon} />}
                                chart={{
                                    categories: service.chartLatency.categories,
                                    series: service.chartLatency.series,
                                    options: {}
                                }}
                                timeline={service.statusTimeline}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </DashboardContent>
    );
}