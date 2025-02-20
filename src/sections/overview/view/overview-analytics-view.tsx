import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Core Domain Services - synthetic health dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Person Profile"
            color="success"
            status="healthy"
            total={714000}
            icon={<img alt="icon" src="https://www.svgrepo.com/download/483839/person-border.svg" />}
            chart={{
              categories: ['12-00', '13-00', '14-00', '15-00', '16-00', '17-00', '18-00', '19-00'],
              series: [200,215, 230, 500, 1150, 100, 120, 200],
            }}
            timeline={[
                { time: '05:00', status: 'healthy' },
                { time: '06:00', status: 'healthy' },
                { time: '07:00', status: 'healthy' },
                { time: '08:00', status: 'healthy' },
                { time: '09:00', status: 'healthy' },
                { time: '10:00', status: 'degraded' },
                { time: '11:00', status: 'unhealthy' },
                { time: '12:00', status: 'healthy' },
                { time: '13:00', status: 'unknown' },
            ]}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="P2P transfer"
            status="healthy"
            total={1352831}
            color="success"
            icon={<img alt="icon" src="https://www.svgrepo.com/download/519837/transfer.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
            timeline={[
                { time: '05:00', status: 'healthy' },
                { time: '06:00', status: 'healthy' },
                { time: '07:00', status: 'healthy' },
                { time: '08:00', status: 'healthy' },
                { time: '09:00', status: 'healthy' },
                { time: '10:00', status: 'degraded' },
                { time: '11:00', status: 'healthy' },
                { time: '12:00', status: 'healthy' },
                { time: '13:00', status: 'healthy' },
            ]}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Local Transfer"
            status="degraded"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="https://www.svgrepo.com/download/470553/transfer.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}

            timeline={[
                { time: '05:00', status: 'healthy' },
                { time: '06:00', status: 'healthy' },
                { time: '07:00', status: 'healthy' },
                { time: '08:00', status: 'healthy' },
                { time: '09:00', status: 'unhealthy' },
                { time: '10:00', status: 'degraded' },
                { time: '11:00', status: 'healthy' },
                { time: '12:00', status: 'healthy' },
                { time: '13:00', status: 'healthy' },
            ]}

          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Account"
            status="unhealthy"
            total={234}
            color="error"
            icon={<img alt="icon" src="https://www.svgrepo.com/download/493990/account-management.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
            timeline={[
                { time: '05:00', status: 'healthy' },
                { time: '06:00', status: 'healthy' },
                { time: '07:00', status: 'healthy' },
                { time: '08:00', status: 'healthy' },
                { time: '09:00', status: 'unhealthy' },
                { time: '10:00', status: 'degraded' },
                { time: '11:00', status: 'healthy' },
                { time: '12:00', status: 'healthy' },
                { time: '13:00', status: 'healthy' },
                { time: '14:00', status: 'unhealthy' },
            ]}
          />
        </Grid>

          <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                  title="Account"
                  status="unhealthy"
                  total={234}
                  color="error"
                  icon={<img alt="icon" src="https://www.svgrepo.com/download/493990/account-management.svg" />}
                  chart={{
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                      series: [56, 30, 23, 54, 47, 40, 62, 73],
                  }}
                  timeline={[
                      { time: '05:00', status: 'healthy' },
                      { time: '06:00', status: 'healthy' },
                      { time: '07:00', status: 'healthy' },
                      { time: '08:00', status: 'healthy' },
                      { time: '09:00', status: 'unhealthy' },
                      { time: '10:00', status: 'degraded' },
                      { time: '11:00', status: 'healthy' },
                      { time: '12:00', status: 'healthy' },
                      { time: '13:00', status: 'healthy' },
                      { time: '14:00', status: 'unhealthy' },
                  ]}
              />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                  title="Account"
                  status="unhealthy"
                  total={234}
                  color="error"
                  icon={<img alt="icon" src="https://www.svgrepo.com/download/493990/account-management.svg" />}
                  chart={{
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                      series: [56, 30, 23, 54, 47, 40, 62, 73],
                  }}
                  timeline={[
                      { time: '05:00', status: 'healthy' },
                      { time: '06:00', status: 'healthy' },
                      { time: '07:00', status: 'healthy' },
                      { time: '08:00', status: 'healthy' },
                      { time: '09:00', status: 'unhealthy' },
                      { time: '10:00', status: 'degraded' },
                      { time: '11:00', status: 'healthy' },
                      { time: '12:00', status: 'healthy' },
                      { time: '13:00', status: 'healthy' },
                      { time: '14:00', status: 'unhealthy' },
                  ]}
              />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                  title="Account"
                  status="unhealthy"
                  total={234}
                  color="error"
                  icon={<img alt="icon" src="https://www.svgrepo.com/download/493990/account-management.svg" />}
                  chart={{
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                      series: [56, 30, 23, 54, 47, 40, 62, 73],
                  }}
                  timeline={[
                      { time: '05:00', status: 'healthy' },
                      { time: '06:00', status: 'healthy' },
                      { time: '07:00', status: 'healthy' },
                      { time: '08:00', status: 'healthy' },
                      { time: '09:00', status: 'unhealthy' },
                      { time: '10:00', status: 'degraded' },
                      { time: '11:00', status: 'healthy' },
                      { time: '12:00', status: 'healthy' },
                      { time: '13:00', status: 'healthy' },
                      { time: '14:00', status: 'unhealthy' },
                  ]}
              />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                  title="Account"
                  status="unhealthy"
                  total={234}
                  color="error"
                  icon={<img alt="icon" src="https://www.svgrepo.com/download/493990/account-management.svg" />}
                  chart={{
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                      series: [56, 30, 23, 54, 47, 40, 62, 73],
                  }}
                  timeline={[
                      { time: '05:00', status: 'healthy' },
                      { time: '06:00', status: 'healthy' },
                      { time: '07:00', status: 'healthy' },
                      { time: '08:00', status: 'healthy' },
                      { time: '09:00', status: 'unhealthy' },
                      { time: '10:00', status: 'degraded' },
                      { time: '11:00', status: 'healthy' },
                      { time: '12:00', status: 'healthy' },
                      { time: '13:00', status: 'healthy' },
                      { time: '14:00', status: 'unhealthy' },
                  ]}
              />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                  title="Account"
                  status="unhealthy"
                  total={234}
                  color="error"
                  icon={<img alt="icon" src="https://www.svgrepo.com/download/493990/account-management.svg" />}
                  chart={{
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                      series: [56, 30, 23, 54, 47, 40, 62, 73],
                  }}
                  timeline={[
                      { time: '05:00', status: 'healthy' },
                      { time: '06:00', status: 'healthy' },
                      { time: '07:00', status: 'healthy' },
                      { time: '08:00', status: 'healthy' },
                      { time: '09:00', status: 'unhealthy' },
                      { time: '10:00', status: 'degraded' },
                      { time: '11:00', status: 'healthy' },
                      { time: '12:00', status: 'healthy' },
                      { time: '13:00', status: 'healthy' },
                      { time: '14:00', status: 'unhealthy' },
                  ]}
              />
          </Grid>

          <Grid xs={12} md={6} lg={12}>
              <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
          </Grid>

          {/*
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Current visits"
            chart={{
              series: [
                { label: 'America', value: 3500 },
                { label: 'Asia', value: 2500 },
                { label: 'Europe', value: 1500 },
                { label: 'Africa', value: 500 },
              ],
            }}
          />
        </Grid>


        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website visits"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2022', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentSubject
            title="Current subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid>



        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite
            title="Traffic by site"
            list={[
              { value: 'facebook', label: 'Facebook', total: 323234 },
              { value: 'google', label: 'Google', total: 341212 },
              { value: 'linkedin', label: 'Linkedin', total: 411213 },
              { value: 'twitter', label: 'Twitter', total: 443232 },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid>
               */}

      </Grid>


    </DashboardContent>
  );
}
