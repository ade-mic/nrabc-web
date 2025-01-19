import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import './styles/WhatToExpect.css';

const WhatToExpect = () => {
  return (
    <section id="what-to-expect" className="what-to-expect">
      <Card className="what-to-expect-content">
      <CardContent>
          <Typography variant="h5" component="div" className="what-to-expect-title">
            What to Expect
          </Typography>
        </CardContent>
        <CardMedia
          component="iframe"
          src="https://www.youtube.com/embed/your-video-id"
          title="What to Expect"
          className="what-to-expect-video"
        />
      </Card>
    </section>
  );
};

export default WhatToExpect;