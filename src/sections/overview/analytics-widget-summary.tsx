import type { CardProps } from '@mui/material/Card';
import type { ColorType } from 'src/theme/core/palette';
import type { ChartOptions } from 'src/components/chart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

import { fNumber, fPercent, fShortenNumber } from 'src/utils/format-number';

import { varAlpha, bgGradient } from 'src/theme/styles';
import Tooltip from '@mui/material/Tooltip';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

// Новый тип для временных статусов
export type TimeStatus = {
    time: string; // Например, "14:30"
    status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown';
};




type ChipColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'default';
const statusColorMapping: Record<'healthy' | 'unhealthy' | 'degraded' | 'unknown', 'success' | 'error' | 'warning' | 'info'> = {
    healthy: 'success',   // зеленый
    unhealthy: 'error',   // красный
    degraded: 'warning',  // желтый
    unknown: 'info',      // вместо "default" используем "info"
};

const getStatusBackground = (
    status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown',
    theme: any
): string => {
    if (status === 'unknown') {
        return theme.palette.grey[500];
    }
    return theme.palette[statusColorMapping[status]].main;
};


type Props = CardProps & {
    title: string;
    total: number;
    status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown';
    color?: ColorType;
    icon: React.ReactNode;
    chart: {
        series: number[];
        categories: string[];
        options?: ChartOptions;
    };
    timeline?: TimeStatus[]; // timeline передается отдельно
};

export function AnalyticsWidgetSummary({
  icon,
  title,
  total,
  chart,
  status,
  color = 'primary',
  sx,
  timeline,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = [theme.palette[color].dark];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    xaxis: { categories: chart.categories },
    grid: {
      padding: {
        top: 6,
        left: 6,
        right: 6,
        bottom: 6,
      },
    },
    tooltip: {
      y: { formatter: (value: number) => fNumber(value), title: { formatter: () => '' } },
    },
    ...chart.options,
  });



  return (
    <Card
      sx={{
        ...bgGradient({
          color: `135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
        }),
        p: 3,
        boxShadow: 'none',
        position: 'relative',
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 48, height: 48, mb: 3 }}>{icon}</Box>

        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <Chip label={status.toUpperCase()} color={statusColorMapping[status]} />
        </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          <Box sx={{ mb: 1, typography: 'subtitle2' }}>{title}</Box>
          <Box sx={{ typography: 'h4' }}>{fShortenNumber(total)}</Box>
        </Box>

        <Chart
          type="line"
          series={[{ data: chart.series }]}
          options={chartOptions}
          width={184}
          height={56}
        />
      </Box>

        {/* Рендерим timeline, если он передан */}
        {timeline && timeline.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                {timeline.map((item: TimeStatus, index: number) => (
                    <Tooltip key={index} title={`${item.time}: ${item.status}`}>
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: getStatusBackground(item.status, theme),
                            }}
                        />
                    </Tooltip>
                ))}
            </Box>
        )}
      <SvgColor
        src="/assets/background/shape-square.svg"
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: -1,
          height: 240,
          opacity: 0.24,
          position: 'absolute',
          color: `${color}.main`,
        }}
      />
    </Card>
  );
}
