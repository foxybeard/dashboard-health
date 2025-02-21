import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Divider,
    Paper,
    Chip,
    IconButton,
    useTheme,
    useMediaQuery,
    Stack,
    TextField
} from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    timelineItemClasses
} from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Тип для отдельного чека (проверки состояния компонента)
export type Check = {
    id: string;
    name: string;
    status: string;
    duration: string;
    description: string;
    data?: {
        ServerDate?: string;
    };
};

// Тип для детальной информации о сервисе
export type DetailedService = {
    id: string;
    icon: string;
    name: string;
    totalDuration: string;
    status: string;
    checks: Check[];
};

type DetailedServiceModalProps = {
    open: boolean;
    onClose: () => void;
    service: DetailedService;
};

export const DetailedServiceModal: React.FC<DetailedServiceModalProps> = ({ open, onClose, service }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    // Для фильтрации по дате
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(7, 'day'));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
    const [showDateFilter, setShowDateFilter] = useState<boolean>(false);

    // Для отладки – убедимся, что service приходит с данными
    useEffect(() => {
        console.log('DetailedServiceModal opened with service:', service);
    }, [service]);

    const handleApplyFilter = () => {
        // Здесь может быть логика фильтрации
        setShowDateFilter(false);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullScreen={fullScreen}
            PaperProps={{
                sx: {
                    width: fullScreen ? '100%' : '600px',
                    maxWidth: '600px',
                    maxHeight: '80vh',
                    borderRadius: theme.shape.borderRadius,
                    p: 2
                }
            }}
        >
            <DialogTitle sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" component="span">
                        {service.name}
                    </Typography>
                    <Chip
                        size="small"
                        label={service.status}
                        color={
                            service.status.toLowerCase() === 'healthy'
                                ? 'success'
                                : service.status.toLowerCase() === 'unhealthy'
                                    ? 'error'
                                    : service.status.toLowerCase() === 'degraded'
                                        ? 'warning'
                                        : 'info'
                        }
                        sx={{ height: 24 }}
                    />
                </Box>
                <Box>
                    <IconButton
                        size="small"
                        onClick={() => setShowDateFilter(!showDateFilter)}
                        sx={{ mr: 1 }}
                        color="primary"
                    >
                        <FilterAltIcon />
                    </IconButton>
                    <IconButton size="small" edge="end" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <Divider />

            {/* Date filter collapsible section */}
            {showDateFilter && (
                <Box sx={{ px: 3, py: 2, bgcolor: theme.palette.grey[50] }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Filter Timeline
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                },
                            }}
                        />
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                },
                            }}
                        />
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size="small" onClick={() => setShowDateFilter(false)} sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button size="small" variant="contained" onClick={handleApplyFilter}>
                            Apply
                        </Button>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                </Box>
            )}

            <DialogContent dividers sx={{ p: 2 }}>
                {/* Service summary */}
                <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: theme.palette.background.default }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <AccessTimeIcon color="action" fontSize="small" />
                        <Typography variant="subtitle2">
                            Total Duration: {service.totalDuration}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {service.checks.length} checks processed
                    </Typography>
                </Paper>

                {/* Check timeline */}
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                    Health Check Timeline
                </Typography>
                <Timeline
                    sx={{
                        m: 0,
                        p: 1,
                        [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
                    }}
                >
                    {service.checks.map((check, index) => (
                        <TimelineItem key={check.id} sx={{ minHeight: 'unset' }}>
                            <TimelineSeparator>
                                <TimelineDot
                                    sx={{ width: 12, height: 12 }}
                                    color={
                                        check.status.toLowerCase() === 'healthy'
                                            ? 'success'
                                            : check.status.toLowerCase() === 'unhealthy'
                                                ? 'error'
                                                : 'warning'
                                    }
                                />
                                {index < service.checks.length - 1 && <TimelineConnector sx={{ width: 1 }} />}
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: 0.5, px: 2 }}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 1.5,
                                        '&:hover': {
                                            boxShadow: 1,
                                            bgcolor: theme.palette.background.default
                                        },
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Typography variant="subtitle2">{check.name}</Typography>
                                        <Chip
                                            size="small"
                                            label={check.duration}
                                            variant="outlined"
                                            sx={{ height: 20, fontSize: '0.7rem' }}
                                        />
                                    </Box>
                                    <Typography variant="body2" sx={{ my: 0.5 }}>
                                        {check.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                        <Chip
                                            size="small"
                                            label={
                                                check.status.toLowerCase() === 'healthy'
                                                    ? 'Healthy'
                                                    : check.status.toLowerCase() === 'unhealthy'
                                                        ? 'Unhealthy'
                                                        : 'Warning'
                                            }
                                            color={
                                                check.status.toLowerCase() === 'healthy'
                                                    ? 'success'
                                                    : check.status.toLowerCase() === 'unhealthy'
                                                        ? 'error'
                                                        : 'warning'
                                            }
                                            sx={{ height: 20, fontSize: '0.7rem' }}
                                        />
                                        {check.data?.ServerDate && (
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(check.data.ServerDate).toLocaleString()}
                                            </Typography>
                                        )}
                                    </Box>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button variant="contained" onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
