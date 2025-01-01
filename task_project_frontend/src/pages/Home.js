import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PlaylistCard from "../components/PlaylistCard";
import { db } from "../firebase";
import update from "immutability-helper";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      // Optionally store token in localStorage or context
    }
    fetchPlaylists(tokenParam);
  }, []);

  const fetchPlaylists = async (token) => {
    if (!token) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/youtube/playlists`,
        {
          headers: { Authorization: token },
        }
      );
      setPlaylists(res.data.playlists);
    } catch (error) {
      console.error("Error fetching playlists", error);
    }
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedCard = playlists[dragIndex];
      setPlaylists(
        update(playlists, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, draggedCard],
          ],
        })
      );
    },
    [playlists]
  );

  const saveLayout = async () => {
    try {
      await db.collection("layouts").doc("userLayout").set({ playlists });
      alert("Layout saved!");
    } catch (error) {
      console.error("Error saving layout", error);
    }
  };

  const loadLayout = async () => {
    try {
      const doc = await db.collection("layouts").doc("userLayout").get();
      if (doc.exists) {
        setPlaylists(doc.data().playlists);
      } else {
        console.log("No saved layout found");
      }
    } catch (error) {
      console.error("Error loading layout", error);
    }
  };

  return (
    <div>
      <h2>Your YouTube Playlists</h2>
      <button onClick={saveLayout}>Save Layout</button>
      <button onClick={loadLayout}>Load Layout</button>
      <div className="playlist-container">
        {playlists.map((playlist, index) => (
          <PlaylistCard
            key={playlist.id}
            index={index}
            playlist={playlist}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
