import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { ServiceData } from 'src/types/ServiceData';
import { AnalyticsWidgetSummary } from 'src/sections/overview/analytics-widget-summary';

const ServicesDashboard: React.FC = () => {
    const [services, setServices] = useState<ServiceData[]>([]);

    useEffect(() => {
        fetch('https://testapi.io/api/foxybeard/services')
            .then(response => response.json())
            .then((data: ServiceData[]) => setServices(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    return (
        <Grid container spacing={3}>
            {services.map(service => (
                <Grid key={service.id} xs={12} sm={6} md={3}>
                    <AnalyticsWidgetSummary
                        title={service.name}
                        total={Number(service.totalDuration)}
                        status={service.status}
                        // Определите color, например, на основе статуса или оставьте фиксированным:
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
    );
};

export default ServicesDashboard;
