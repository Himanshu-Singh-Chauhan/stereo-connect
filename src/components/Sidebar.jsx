import React from "react";
import styled from "styled-components";
export default function Sidebar() {
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
          </li>
          <li>
            <span>Recommended Songs</span>
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
