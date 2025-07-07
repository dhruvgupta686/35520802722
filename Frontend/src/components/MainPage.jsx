import React, { useState } from "react";
import {
  Container, TextField, Button, Grid, Typography, Box
} from "@mui/material";

const generateShortCode = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
export default function MainPage() {
  const [urls, setUrls] = useState([{ url: "", validity: "", code: "" }]);
  const [shortened, setShortened] = useState(() => {
    return JSON.parse(localStorage.getItem("urls")) || [];
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const urlList = [...urls];
    urlList[index][field] = value;
    setUrls(urlList);
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: "", validity: "", code: "" }]);
    }
  };

  const handleShorten = () => {
    const newErrors = [];
    const shortList = [...shortened];

    urls.forEach(({ url, validity, code }, i) => {
      let shortCode = code?.trim() || generateShortCode();
      const isDuplicate = shortList.find((s) => s.code === shortCode);


      if (isDuplicate) {
        return "Shortcode already used";
      }

      const now = new Date();
      const expiry = new Date(now.getTime() + (parseInt(validity || "30") * 60000));

      shortList.push({
        url,
        code: shortCode,
        createdAt: now.toISOString(),
        expiresAt: expiry.toISOString(),
        clicks: [],
      });

      newErrors[i] = "";
    });

    setErrors(newErrors);
    setShortened(shortList);
    localStorage.setItem("urls", JSON.stringify(shortList));
  };

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>URL Shortener</Typography>
      {urls.map((entry, i) => (
        <Box key={i} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth label="Original URL"
                value={entry.url}
                onChange={(e) => handleChange(i, "url", e.target.value)}
                error={!!errors[i]}
                helperText={errors[i]}
              />
            </Grid>
            <Grid item xs={4} md={2}>
              <TextField
                label="Validity (mins)"
                type="number"
                value={entry.validity}
                onChange={(e) => handleChange(i, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={3}>
              <TextField
                fullWidth label="Custom Shortcode"
                value={entry.code}
                onChange={(e) => handleChange(i, "code", e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="contained" onClick={addField} disabled={urls.length >= 5}>
        Add More
      </Button>
      <Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={handleShorten}>
        Shorten URLs
      </Button>
      <Box mt={4}>
        {shortened.map((s, i) => (
          <Typography key={i}>
            {s.url} : <a href={`/${s.code}`} target="_blank"> http://localhost:3000/{s.code}</a>
          </Typography>
        ))}
      </Box>
      <Box mt={2}>
        <Button href="/stats" variant="contained" color="primary">View Stats</Button>
      </Box>
    </Container>
  );
}