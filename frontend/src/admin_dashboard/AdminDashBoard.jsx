import React from "react";
import "./styles/AdminDashBoard.css";
import { useAuth } from "../contexts/AuthContext";
import VerticalMenu from "./VerticalMenu";
import { 
  Paper, 
  Container,
  Box, 
  Typography, 
  Card, 
  CardContent,
  IconButton,
} from "@mui/material";
import {
  People,
  Article,
  CloudUpload,
  Event,
  MoreVert
} from "@mui/icons-material";

const StatCard = ({ title, value, icon }) => (
  <Card 
    sx={{ 
      height: '100%', 
      bgcolor: '#f5f5f5',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        bgcolor: '#ffffff'
      }
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>
      <Box 
        sx={{ 
          mt: 2, 
          display: 'flex', 
          alignItems: 'center',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        }}
      >
        {icon}
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  const stats = {
    totalUsers: 150,
    totalArticles: 45,
    totalResources: 28,
    totalEvents: 12
  };

  return (
    <div className="admin-dashboard">
      <div className="vertical-drawer">
        <VerticalMenu />
      </div>
      
      <div className="admin-content">
        <Container maxWidth="xl">
          <Box sx={{ width: '100%', p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
              Admin Dashboard
            </Typography>

            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr 1fr 1fr'
                },
                gap: 3
              }}
            >
              <StatCard 
                title="Total Users"
                value={stats.totalUsers}
                icon={<People sx={{ color: '#1976d2', fontSize: 32 }} />}
              />
              <StatCard 
                title="Articles Published"
                value={stats.totalArticles}
                icon={<Article sx={{ color: '#9c27b0', fontSize: 32 }} />}
              />
              <StatCard 
                title="Resources Available"
                value={stats.totalResources}
                icon={<CloudUpload sx={{ color: '#2e7d32', fontSize: 32 }} />}
              />
              <StatCard 
                title="Events Scheduled"
                value={stats.totalEvents}
                icon={<Event sx={{ color: '#ed6c02', fontSize: 32 }} />}
              />
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;
