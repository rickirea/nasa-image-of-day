import React, { useState, useEffect } from "react";
import HttpClient from "./services/nasa.service";
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
  const [date, setDate] = useState(today);

  const setImageOfDay = async (date) => {
    try {
      const client = new HttpClient();
      const imageOfDay = await client.getNasaImageOfDay(`date=${date}`);

      setNasaImageOfDay(imageOfDay);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.code,
        text: error.response.data.msg,
      });
      setDate("Try Another Date");
    }
  };

  useEffect(() => {
    setDate(today);
    setImageOfDay(today);
  }, []);

  const onChange = (date, dateString) => {
    setDate(dateString ? dateString : today);
    setImageOfDay(dateString);
  };

  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <div>NASA IMAGE OF THE DAY</div>
        <div>({date})</div>
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
