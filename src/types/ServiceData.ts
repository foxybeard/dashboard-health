export type ServiceData = {
    id: string;
    icon: string;
    name: string;
    totalDuration: string; // возвращается как строка, например "1843007"
    status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown';
    chartLatency: {
        categories: string[];
        series: number[];
    };
    statusTimeline: {
        time: string;
        status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown';
    }[];
};
