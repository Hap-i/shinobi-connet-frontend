import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute } from "../utils/ApiRoutes";
function Chat() {
  const navigate = useNavigate();
  const [contacts, setcontacts] = useState();
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    if (!localStorage.getItem("user-data")) {
      navigate("/login");
    } else {
      console.log("setting the current user");
      setCurrentUser(JSON.parse(localStorage.getItem("user-data")));
    }
  }, []);

  const getContacts = async function () {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        console.log("calling the api");
        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        console.log(data);
        setcontacts(data.data.users);
      } else {
        navigate("/setavatar");
      }
    }
  };
  useEffect(() => {
    console.log("inside second use effect");
    getContacts();
  }, []);
  return (
    <Container>
      <div className="container"></div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
