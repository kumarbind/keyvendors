import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardDetails({title,content,mediaSrc,children,action}) {
  return (
    <Card sx={{
      position: "relative",
      mx: "1.5rem",
      mt: "3rem",
      p: 2,
    }}>
      {mediaSrc &&<CardMedia
        sx={{ height: 140 }}
        image={mediaSrc}
        title="green iguana"
      />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
          {children}
        </Typography>
      </CardContent>
      {action && <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>}
    </Card>
  );
}