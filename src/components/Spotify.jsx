import React, { useEffect, useRef, useState, useContext } from "react";
// import Sidebar from "./Sidebar"; // do not use, use one in this file
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import { reducerCases } from "../utils/Constants";

// import { io } from 'socket.io-client'
// import { useContext } from "react";

import { SocketContext } from "../utils/socket";

export default function Spotify() {
  const [pageToShow, setPageToShow] = useState("home");

  const socket = useContext(SocketContext);

  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(token);
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  useEffect(() => {
    const getPlaybackState = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: data.is_playing,
      });
    };
    getPlaybackState();
  }, [dispatch, token]);

  let page;

  if (pageToShow === "home") {
    page = (
      <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
        <Navbar navBackground={navBackground} />
        <div className="body__contents">
          <Body headerBackground={headerBackground} />
        </div>
      </div>
    );
  }

  if (pageToShow === "recom") {
    page = (
      <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
        Recommended songs here
      </div>
    );
  
  }
  if (pageToShow === "rooms") {
    page = (
      <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
        Rooms here
      </div>
    );
  }

  return (
    <Container>
      <div className="spotify__body">
        {/* SideBAR start */}
        <SidebarContainer>
          <div className="top__links">
            <div className="logo">
              {/* <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          /> */}
              StereoConnect
            </div>
            <ul>
              <li>
                <span onClick={() => setPageToShow("home")}>Home</span>
                {/* <span>{pageToShow}</span> */}
              </li>
              <li>
                <span onClick={() => setPageToShow("recom")}>
                  Recommended Songs
                </span>
              </li>
              <li>
                <span><a href="http://localhost:5000/">Rooms</a></span>
              </li>
            </ul>
          </div>
        </SidebarContainer>
        {/* SideBAR end */}
        {page}
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}

function Sidebar() {
  return (
    <SidebarContainer>
      <div className="top__links">
        <div className="logo">
          {/* <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          /> */}
          StereoConnect
        </div>
        <ul>
          <li>
            <span>Home</span>
            <span>pageToShow</span>
          </li>
          <li>
          
          <a href="http://localhost:5000/"><span>Recommended Songs</span></a>
          </li>
          <li>
            <span>Rooms</span>
          </li>
        </ul>
      </div>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
