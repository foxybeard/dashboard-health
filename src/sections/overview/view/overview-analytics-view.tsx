import React, { useState, useEffect } from 'react'; // Импортируем React, useState, useEffect один раз
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { ServiceData } from 'src/types/ServiceData';
import { DetailedServiceModal } from 'src/sections/overview/DetailedServiceModal'; // Именованный экспорт
import { DashboardContent } from 'src/layouts/dashboard';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Добавляем состояние для выбранного сервиса
    const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

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
                            {/* Используем Box вместо div для доступности */}
                            <Box
                                onClick={() => setSelectedService(service)}
                                onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
                                    if (e.key === 'Enter') setSelectedService(service);
                                }}
                                role="button"
                                tabIndex={0}
                                sx={{ cursor: 'pointer' }}
                            >
                                <AnalyticsWidgetSummary
                                    title={service.name}
                                    total={Number(service.totalDuration)}
                                    status={service.status}
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
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {selectedService && (
                <DetailedServiceModal
                    open={Boolean(selectedService)}
                    onClose={() => setSelectedService(null)}
                    service={{
                        id: selectedService.id,
                        icon: selectedService.icon,
                        name: selectedService.name,
                        totalDuration: selectedService.totalDuration,
                        status: selectedService.status,
                        checks: [
                            {
                                id: 'check1',
                                name: 'PostgreSQL',
                                status: 'Healthy',
                                duration: '4248147',
                                description: 'PostgreSQL Server is reachable.',
                                data: { ServerDate: '2025-02-07T08:36:15.9829Z' }
                            },
                            {
                                id: 'check2',
                                name: 'MSSQL Server',
                                status: 'Healthy',
                                duration: '1221771',
                                description: 'MSSQL Server is reachable.',
                                data: { ServerDate: '2025-02-07T12:36:16.95Z' }
                            },
                            {
                                id: 'check3',
                                name: 'ExternalCard Service',
                                status: 'Healthy',
                                duration: '4751515',
                                description: 'http://external-cards/healthz is reachable.'
                            },
                            {
                                id: 'check4',
                                name: 'Tarification Service',
                                status: 'Healthy',
                                duration: '4202452',
                                description: 'http://tariffication/healthz is reachable.'
                            },
                            {
                                id: 'check5',
                                name: 'Account Service',
                                status: 'Healthy',
                                duration: '4752314',
                                description: 'http://account/healthz is reachable.'
                            },
                            {
                                id: 'check6',
                                name: 'PersonProfile Service',
                                status: 'Healthy',
                                duration: '4752171',
                                description: 'http://personprofile/healthz is reachable.'
                            }
                        ]
                    }}
                />
            )}
        </DashboardContent>
    );
}
