import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container, Grid, Paper } from '@mui/material';


const Dashbord = () => {
  return (
      <Card sx={{ minWidth: 275 }}>
        {/* <LinearProgress /> */}
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
           Dashboard
          </Typography>
        
          <div variant="body2">

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    fontSize:'30px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                 System Users:
                 100
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    fontSize:'30px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                   Current Racks:
                 500
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12} md={4} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', fontSize:'30px', flexDirection: 'column' }}>
                 Total Epaper:
                 500 
                </Paper>
              </Grid>
            </Grid>
           
          </Container>
           
          </div>
        </CardContent>
        
      </Card>
    );
   
}

export default Dashbord