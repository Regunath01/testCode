import { Box, Card, CardContent, Typography, Grid, Paper, Chip } from '@mui/material';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import './Dashboard.css';

const Dashboard = () => {
  const statsCards = [
    {
      title: 'Total Workflows',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: <AccountTreeIcon />,
      color: '#1976d2',
    },
    {
      title: 'Active Workflows',
      value: '18',
      change: '+8%',
      trend: 'up',
      icon: <CheckCircleIcon />,
      color: '#2e7d32',
    },
    {
      title: 'Failed Executions',
      value: '3',
      change: '-25%',
      trend: 'down',
      icon: <ErrorIcon />,
      color: '#d32f2f',
    },
    {
      title: 'Success Rate',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: <TrendingUpIcon />,
      color: '#ed6c02',
    },
  ];

  const executionData = [
    { date: 'Mon', executions: 45 },
    { date: 'Tue', executions: 52 },
    { date: 'Wed', executions: 48 },
    { date: 'Thu', executions: 61 },
    { date: 'Fri', executions: 55 },
    { date: 'Sat', executions: 38 },
    { date: 'Sun', executions: 42 },
  ];

  const performanceData = [
    { time: '00:00', value: 30 },
    { time: '04:00', value: 20 },
    { time: '08:00', value: 50 },
    { time: '12:00', value: 80 },
    { time: '16:00', value: 70 },
    { time: '20:00', value: 45 },
    { time: '24:00', value: 35 },
  ];

  const recentActivities = [
    {
      id: 1,
      workflow: 'Customer Onboarding',
      status: 'success',
      time: '2 minutes ago',
      duration: '1.2s',
    },
    {
      id: 2,
      workflow: 'Data Sync Pipeline',
      status: 'success',
      time: '15 minutes ago',
      duration: '3.5s',
    },
    {
      id: 3,
      workflow: 'Email Campaign',
      status: 'failed',
      time: '1 hour ago',
      duration: '0.8s',
    },
    {
      id: 4,
      workflow: 'Invoice Generation',
      status: 'success',
      time: '2 hours ago',
      duration: '2.1s',
    },
    {
      id: 5,
      workflow: 'Slack Notification',
      status: 'success',
      time: '3 hours ago',
      duration: '0.5s',
    },
  ];

  return (
    <Box className="dashboard-container fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Monitor your workflow executions and performance"
      />

      <Grid container spacing={3}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card className="stats-card" elevation={2}>
              <CardContent sx={{ padding: '24px !important' }}>
                <Box className="stats-card-header">
                  <Box
                    className="stats-card-icon"
                    sx={{
                      backgroundColor: `${card.color}15`,
                      color: card.color
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Chip
                    label={card.change}
                    size="small"
                    className={`trend-chip ${card.trend}`}
                  />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, marginTop: 1, fontSize: '2.25rem' }}>
                  {card.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 0.5, fontSize: '0.9rem', fontWeight: 500 }}
                >
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: 0.5 }}>
        <Grid item xs={12} lg={8}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent sx={{ padding: '28px !important', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 3, fontSize: '1.125rem' }}>
                Workflow Executions
              </Typography>
              <Box sx={{ flex: 1, minHeight: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={executionData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorExecutions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1976d2" stopOpacity={0.5} />
                        <stop offset="50%" stopColor="#1976d2" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="0"
                      stroke="#e8eef3"
                      vertical={false}
                      opacity={0.6}
                    />
                    <XAxis
                      dataKey="date"
                      stroke="#94a3b8"
                      style={{ fontSize: '12px', fontWeight: 500 }}
                      tick={{ fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      style={{ fontSize: '12px', fontWeight: 500 }}
                      tick={{ fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e0e0e0',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        padding: '12px 16px',
                      }}
                      cursor={{ strokeDasharray: '3 3', stroke: '#1976d2', opacity: 0.5 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="executions"
                      stroke="#1976d2"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorExecutions)"
                      isAnimationActive={true}
                      animationDuration={800}
                      animationEasing="ease-in-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent sx={{ padding: '28px !important', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 3, fontSize: '1.125rem' }}>
                Performance
              </Typography>
              <Box sx={{ flex: 1, minHeight: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="0"
                      stroke="#e8eef3"
                      vertical={false}
                      opacity={0.6}
                    />
                    <XAxis
                      dataKey="time"
                      stroke="#94a3b8"
                      style={{ fontSize: '12px', fontWeight: 500 }}
                      tick={{ fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      style={{ fontSize: '12px', fontWeight: 500 }}
                      tick={{ fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e0e0e0',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        padding: '12px 16px',
                      }}
                      cursor={{ strokeDasharray: '3 3', stroke: '#2e7d32', opacity: 0.5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2e7d32"
                      strokeWidth={2.5}
                      dot={{
                        fill: '#2e7d32',
                        r: 4.5,
                        strokeWidth: 2.5,
                        stroke: '#fff',
                      }}
                      activeDot={{ r: 6, strokeWidth: 2.5 }}
                      isAnimationActive={true}
                      animationDuration={800}
                      animationEasing="ease-in-out"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ marginTop: 3 }} elevation={2}>
        <CardContent sx={{ padding: '28px !important' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 3, fontSize: '1.125rem' }}>
            Recent Activity
          </Typography>
          <Box className="activity-list">
            {recentActivities.map((activity) => (
              <Paper key={activity.id} className="activity-item" elevation={0}>
                <Box className="activity-info">
                  <Box className="activity-name">
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      {activity.workflow}
                    </Typography>
                    <Chip
                      label={activity.status}
                      size="small"
                      className={`status-chip ${activity.status}`}
                    />
                  </Box>
                  <Box className="activity-meta">
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8125rem' }}>
                      {activity.time}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8125rem' }}>
                      Duration: {activity.duration}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
