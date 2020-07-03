import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import axiosRetry from "axios-retry";
import Tweet from "./Tweet";
import dedup from "./dedup";
import "./styles.css";

axiosRetry(axios, { retries: 3 });

const ITEM_COUNT = 20;

const buildURLbyId = id => {
  return id === 0
    ? `https://magiclab-twitter-interview.herokuapp.com/gaston-rampersad/api`
    : `https://magiclab-twitter-interview.herokuapp.com/gaston-rampersad/api?count=${ITEM_COUNT}&afterId=${id}`;
};

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = buildURLbyId(id);
        const result = await axios(url);

        const mergedData = [...data, ...result.data];
        const dedupedData = dedup(mergedData);
        const sortedData = dedupedData.sort((a, b) => b.id - a.id);
        setData(sortedData);
      } catch (error) {}
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setId(data[0].id);
    }, 2000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="App">
      <div>
        {data.map(tweet => (
          <Tweet
            key={tweet.id}
            userName={tweet.username}
            imageURL={tweet.image}
            tweetText={tweet.text}
          />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
