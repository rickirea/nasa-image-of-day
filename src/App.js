import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import Swal from "sweetalert2";
dayjs.extend(customParseFormat);

const nasaApiUrl = "https://api.nasa.gov/planetary/apod?";
const nasaApiKey = "qnTfqqLAzfizQcMPGF7UI9rDKIovlzmPMliXQGXL";

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
const yyyy = today.getFullYear();

if (dd < 10) {
  dd = "0" + dd;
}

if (mm < 10) {
  mm = "0" + mm;
}

today = yyyy + "-" + mm + "-" + dd;

const dateFormat = "YYYY-MM-DD";

function App() {
  const [nasaImageOfDay, setNasaImageOfDay] = useState({});

  const setImageOfDay = async (date) => {
    try {
      const imageOfDay = await axios.get(
        `${nasaApiUrl}api_key=${nasaApiKey}&date=${date}`
      );

      setNasaImageOfDay(imageOfDay.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.code,
        text: error.response.data.msg,
      });
    }
  };

  useEffect(() => {
    setImageOfDay(today);
  }, []);

  const onChange = (date, dateString) => {
    setImageOfDay(dateString);
  };

  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <div>NASA IMAGE OF THE DAY</div>
        <br></br>
        <Space direction="vertical">
          <DatePicker
            defaultValue={dayjs(today, dateFormat)}
            onChange={onChange}
          />
        </Space>
        <br></br>
        <Card sx={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={nasaImageOfDay.url}
              alt="Nasa Image of Day"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {nasaImageOfDay.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {nasaImageOfDay.explanation}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button href={nasaImageOfDay.url} target="_blank">
              See Image
            </Button>
          </CardActions>
        </Card>
      </header>
    </div>
  );
}

export default App;
