import React, { useEffect, useState } from "react";
import { Container, Typography, Box, List, ListItem, Divider, Button } from "@mui/material";

export default function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls")) || [];
    setUrls(stored);
  }, []);

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>Session Stats</Typography>
      <List>
        {urls.map((u, i) => (
          <Box key={i}>
            <ListItem>
              <Box>
                <Typography>Short URL: <a href={`/${u.code}`} target="_blank" rel="noreferrer">{window.location.origin}/{u.code}</a></Typography>
                <Typography>Original: {u.url}</Typography>
                <Typography>Created: {new Date(u.createdAt).toLocaleString()}</Typography>
                <Typography>Expires: {new Date(u.expiresAt).toLocaleString()}</Typography>
               
              </Box>
            </ListItem>
            <Divider />
          </Box>
        ))}

          
      </List>
      <Button href="/" variant="contained" color="primary">Back to Main Page</Button>
    </Container>
  );
}
