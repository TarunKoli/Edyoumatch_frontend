import { useState, createContext } from "react";
export const ViewContext = createContext();
export const ProfileContext = createContext();
export const ChatContext = createContext();
export const NavContext = createContext();
export const PathContext = createContext();

export const PathProvider = (props) => {
  const [path, setPath] = useState();
  return (
    <PathContext.Provider value={[path, setPath]}>
      {props.children}
    </PathContext.Provider>
  );
};

export const NavProvider = (props) => {
  const [nav, setNav] = useState(true);
  return (
    <NavContext.Provider value={[nav, setNav]}>
      {props.children}
    </NavContext.Provider>
  );
};

export const ViewProvider = (props) => {
  const [view, setView] = useState("home");

  return (
    <ViewContext.Provider value={[view, setView]}>
      {props.children}
    </ViewContext.Provider>
  );
};

export const ProfileProvider = (props) => {
  const [profile, setProfile] = useState(false);
  return (
    <ProfileContext.Provider value={[profile, setProfile]}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export const ChatProvider = (props) => {
  const [chat, setChat] = useState(false);
  return (
    <ChatContext.Provider value={[chat, setChat]}>
      {props.children}
    </ChatContext.Provider>
  );
};
