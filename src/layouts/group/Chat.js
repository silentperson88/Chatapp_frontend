/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Container, TextField, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Constants from "utils/Constants";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
import Sessions from "utils/Sessions";

const socket = io(Constants.SOCKET_URL);

function chatScreen({ messages, newMessage, setNewMessage, setMessages }) {
  const [tempMessages, setTempMessages] = useState({
    isNewMessage: false,
    isLiked: false,
    message: {},
  });
  const { id } = useParams();
  const token = jwtDecode(Sessions.userToken);

  const handleSend = async () => {
    socket.emit(`${id}/send-message`, { groupId: id, sender: token.id, message: newMessage });
  };

  const handleLike = async (index, chatId) => {
    socket.emit(`${id}/like-message`, { messageId: chatId });
  };

  useEffect(() => {
    if (tempMessages.isLiked && Object.entries(tempMessages.message).length > 0) {
      const index = messages.findIndex(
        (msg) => msg.chatId === tempMessages.message[Constants.MONGOOSE_ID]
      );
      const tempMessage = [...messages];
      tempMessage[index].likedCount = tempMessages.message.like;
      setMessages(tempMessage);
      setTempMessages({ isNewMessage: false, isLiked: false, message: {} });
    } else if (tempMessages.isNewMessage && Object.entries(tempMessages.message).length > 0) {
      setMessages([
        ...messages,
        {
          text: tempMessages.message.message,
          chatId: tempMessages.message[Constants.MONGOOSE_ID],
          isSent: token.id === tempMessages.message.sender,
        },
      ]);
      if (token.id === tempMessages.message.sender) setNewMessage("");
      setTempMessages({ isNewMessage: false, isLiked: false, message: {} });
    }
  }, [tempMessages, id]);

  useEffect(() => {
    socket.on(`${id}/like-message`, (res) => {
      setTempMessages({
        isNewMessage: false,
        isLiked: true,
        message: res.messageData,
      });
    });
  }, [id]);

  useEffect(() => {
    socket.on(`${id}/send-message`, (res) => {
      setTempMessages({
        isNewMessage: true,
        isLiked: false,
        message: res,
      });
    });
  }, [id]);

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "10px" }}>
        <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ddd" }}>
          {messages.map((message, index) => (
            <div
              style={{
                textAlign: message.isSent ? "right" : "left",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "5px 10px",
                  backgroundColor: message.isSent ? "#DCF8C6" : "#ECE5DD",
                  borderRadius: "10px",
                }}
              >
                {message.text}
                {message.isSent || (
                  <Tooltip title={message.liked ? "Unlike" : "Like"} placement="left">
                    <span>
                      <IconButton
                        onClick={() => handleLike(index, message.chatId)}
                        color={message.liked ? "primary" : "default"}
                        style={{ marginLeft: "5px", verticalAlign: "middle" }}
                      >
                        <ThumbUpIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                {message.likedCount > 0 && (
                  <Typography
                    variant="caption"
                    style={{ marginLeft: "5px", verticalAlign: "middle" }}
                  >
                    {message.likedCount} Likes
                  </Typography>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            label="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <IconButton onClick={handleSend} color="primary">
            <SendIcon />
          </IconButton>
        </div>
      </Paper>
    </Container>
  );
}

export default chatScreen;
