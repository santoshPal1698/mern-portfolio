import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { PORTFOLIOPOINTS } from "../../Api/Endpoints";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
// ─── Animations ────────────────────────────────────────────────────────────────
const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.6); }
  50%       { box-shadow: 0 0 0 12px rgba(99,102,241,0); }
`;

const blink = keyframes`
  0%, 80%, 100% { opacity: 0; }
  40%           { opacity: 1; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// ─── Styled Components ──────────────────────────────────────────────────────────
const FloatBtn = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 9999;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-size: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2.4s ease-in-out infinite;
  transition: transform 0.2s;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.45);

  &:hover {
    transform: scale(1.1);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 104px;
  right: 32px;
  z-index: 9998;
  width: 380px;
  max-height: 600px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #0f0f13;
  border: 1px solid rgba(99, 102, 241, 0.25);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.04);
  animation: ${fadeSlideUp} 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  @media (max-width: 480px) {
    width: calc(100vw - 24px);
    right: 12px;
    bottom: 88px;
    max-height: 70vh;
  }
`;

const Header = styled.div`
  padding: 16px 20px;
  background: linear-gradient(90deg, #1a1a2e, #16213e);
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const BotName = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 15px;
  color: #e2e8f0;
`;

const StatusDot = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #4ade80;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    display: inline-block;
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #64748b;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition:
    color 0.2s,
    background 0.2s;

  &:hover {
    color: #e2e8f0;
    background: rgba(255, 255, 255, 0.06);
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 4px;
  }
`;

const MessageRow = styled.div`
  display: flex;
  justify-content: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  align-items: flex-end;
  gap: 8px;
`;

const MsgAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
`;

const Bubble = styled.div`
  padding: 10px 14px;
  border-radius: ${({ $isUser }) =>
    $isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px"};
  background: ${({ $isUser }) =>
    $isUser
      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
      : "rgba(255,255,255,0.06)"};
  border: ${({ $isUser }) =>
    $isUser ? "none" : "1px solid rgba(255,255,255,0.08)"};
  font-size: 13px;
  line-height: 1.6;
  color: ${({ $isUser }) => ($isUser ? "#fff" : "#cbd5e1")};
  word-break: break-word;
  white-space: pre-wrap;
`;

const TypingBubble = styled(Bubble)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 12px 16px;
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6366f1;
  animation: ${blink} 1.2s infinite;
  animation-delay: ${({ $d }) => $d};
  display: inline-block;
`;

const Timestamp = styled.span`
  font-size: 10px;
  color: #475569;
  align-self: flex-end;
  margin-bottom: 2px;
`;

const InputRow = styled.div`
  padding: 14px 16px;
  border-top: 1px solid rgba(99, 102, 241, 0.15);
  display: flex;
  align-items: flex-end;
  gap: 10px;
  background: #0a0a0f;
`;

const TextInput = styled.textarea`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.25);
  border-radius: 12px;
  padding: 10px 14px;
  color: #e2e8f0;
  font-size: 13px;
  resize: none;
  max-height: 120px;
  min-height: 40px;
  outline: none;
  transition: border-color 0.2s;
  line-height: 1.5;

  &::placeholder {
    color: #475569;
  }
  &:focus {
    border-color: rgba(99, 102, 241, 0.6);
  }
`;

const SendBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: ${({ disabled }) =>
    disabled
      ? "rgba(99,102,241,0.3)"
      : "linear-gradient(135deg, #6366f1, #8b5cf6)"};
  color: #fff;
  font-size: 17px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.15s;

  &:hover:not(:disabled) {
    transform: scale(1.08);
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const SuggestionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 16px 12px;
`;

const SuggestChip = styled.button`
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 20px;
  color: #a5b4fc;
  font-size: 11px;
  padding: 5px 12px;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: rgba(99, 102, 241, 0.25);
    color: #fff;
  }
`;

// ─── Helpers ────────────────────────────────────────────────────────────────────
const fmt = (d) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const SUGGESTIONS = [
  "Projects",
  "Skills",
  "Experience",
  "Companies",
  "Tech Stack",
  "Generative AI",
  "Trending Tech",
  "Microservices",
  "React vs Angular"
];

// ─── Main Component ─────────────────────────────────────────────────────────────
const AIChatbot = () => {

  const {  portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  console.log("Intro from Redux:", intro);
  const { name, profile_url } = intro;

  
  const initialMessages = [
    {
      role: "assistant",
      // content: [{ type: "text", text: "Hey 👋 I'm Santosh's AI assistant. Ask me anything about his skills, projects, or experience!" }],
      content: "Hey 👋 I'm Santosh's AI assistant. Ask me anything about his skills, projects, or experience!",
      ts: new Date(),
    }
  ]; // your initial state
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      // content: [{ type: "text", text: "Hey 👋 I'm Santosh's AI assistant. Ask me anything about his skills, projects, or experience!" }],
      content: `Hey 👋 I'm ${name}'s AI assistant. Ask me anything about his skills, projects, or experience!`,
      ts: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const toggleChat = () => {
    setOpen((prev) => {
      // 👉 if closing → reset messages
      if (prev === true) {
        setMessages(initialMessages);
      }
      return !prev;
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg = { role: "user", content: trimmed, ts: new Date() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post(`${PORTFOLIOPOINTS.ApiBaseUrl}ai-chatBoat`, {
        messages: history.map(({ role, content }) => ({ role, content })),
      });
      const reply = res.data?.reply || "Sorry, I couldn't get a response.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, ts: new Date() },
      ]);
    } catch (error) {
      // console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Server error. Please try again later.",
          ts: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <FloatBtn onClick={toggleChat} title="Chat with AI">
        {open ? <CloseIcon /> : "🤖"}
      </FloatBtn>

      {/* ── Chat Window ── */}
      {open && (
        <ChatWindow>
          {/* Header */}
          <Header>
              <Avatar>🤖</Avatar>
            {/* <Avatar>{profile_url ? <img src={profile_url} alt={name} /> : name.charAt(0)}</Avatar> */}
            <HeaderInfo>
              <BotName>{name}&apos;AI</BotName>
              <StatusDot>Online</StatusDot>
            </HeaderInfo>
            <CloseBtn onClick={toggleChat}>✕</CloseBtn>
          </Header>

          {/* Messages */}
          <MessagesArea>
            {messages.map((msg, i) => (
              <MessageRow key={i} $isUser={msg.role === "user"}>
                {msg.role === "assistant" && <MsgAvatar>🤖</MsgAvatar>}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                    gap: 3,
                  }}
                >
                  <Bubble $isUser={msg.role === "user"}>{msg.content}</Bubble>
                  <Timestamp>{fmt(msg.ts)}</Timestamp>
                </div>
              </MessageRow>
            ))}

            {/* Typing dots */}
            {loading && (
              <MessageRow $isUser={false}>
                <MsgAvatar>🤖</MsgAvatar>
                <TypingBubble $isUser={false}>
                  <Dot $d="0s" />
                  <Dot $d="0.2s" />
                  <Dot $d="0.4s" />
                </TypingBubble>
              </MessageRow>
            )}

            <div ref={bottomRef} />
          </MessagesArea>

          {/* Quick suggestion chips — only shown at start */}
          {messages.length <= 1 && (
            <SuggestionsRow>
              {SUGGESTIONS.map((s) => (
                <SuggestChip key={s} onClick={() => sendMessage(s)}>
                  {s}
                </SuggestChip>
              ))}
            </SuggestionsRow>
          )}

          {/* Input bar */}
          <InputRow>
            <TextInput
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything…"
            />
            <SendBtn
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
            >
              {loading ? <Spinner /> : "➤"}
            </SendBtn>
          </InputRow>
        </ChatWindow>
      )}
    </>
  );
};
export default AIChatbot;
