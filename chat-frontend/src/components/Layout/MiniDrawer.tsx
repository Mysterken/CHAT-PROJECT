import * as React from 'react';
import {useEffect} from 'react';
import {CSSObject, styled, Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import MessageBubble from "../Chat/MessageBubble.jsx";
import {getUsers} from "../../API/user.js";
import {getChat, postChat} from "../../API/chat.js";
import TextField from "@mui/material/TextField";
import {ListItemButton} from "@mui/material";
import LoginAvatarMenu from "../Commons/LoginAvatarMenu.jsx";
import {getUserId} from "../../API/security";
import {toast, ToastContainer} from "react-toastify";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [currentRecipient, setCurrentRecipient] = React.useState(0);
  const [currentReceiver, setCurrentReceiver] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState(getUserId());

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function getChatMessage(recipient) {
    if (recipient === 0) {
      return;
    }
    getChat(currentUser, recipient)
      .then((response) => {
        setMessages(response)
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  function handleSendMessage() {

    const data = {
      sender: currentUser,
      receiver: currentRecipient,
      content: document.getElementById("message-field").value
    }

    postChat(currentUser, data)
      .then((response) => {
        getChatMessage(currentRecipient);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  function changeCurrentRecipient(id) {
    setCurrentRecipient(id);
  }

  useEffect(() => {
    if (currentRecipient == 0) {
      return;
    }
    getChatMessage(currentRecipient);
  }, [currentRecipient])

  useEffect(() => {
    getUsers()
      .then((response) => {
        // remove current user from list
        const u = response.findIndex((user) => user.id === currentUser);
        response.splice(u, 1);
        // assign a random color to each user
        response.forEach((user) => {
          const randomHexColor = Math.floor(Math.random() * 16777215).toString(16);
          user.color = "#" + randomHexColor;
        })
        setUsers(response);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }, []);

  useEffect(() => {
    // get current receiver by id
    if (currentRecipient == 0) {
      return;
    }
    const receiver = users.find((user) => user.id == currentRecipient);
    setCurrentReceiver(receiver);
  }, [currentRecipient]);

  return (
    <Box sx={{display: 'flex'}}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && {display: 'none'}),
            }}
          >
            <MenuIcon/>
          </IconButton>
          <ChatIcon sx={{mr: 1}}/>
          <Typography variant="h6" noWrap component="div">
            CHAT-PROJECT
          </Typography>
          <Box sx={{ml: "auto"}}>
            <LoginAvatarMenu/>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List>
          {users.map((user) => {
            // get first letter of username
            const firstLetter = user.username.charAt(0).toUpperCase();
            return (
              <ListItemButton onClick={() => changeCurrentRecipient(user.id)}>
                <Avatar sx={{backgroundColor: user.color}}>{firstLetter}</Avatar>
                <ListItemText primary={user.username} sx={{ml: "10px"}}/>
              </ListItemButton>
            );
          })}
        </List>
        <Divider/>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <DrawerHeader/>
        {currentRecipient === 0 ? <Typography variant="h5">Select a user to start chatting</Typography> :
          <Typography variant="h5">Chatting with {currentReceiver.username}</Typography>}
        {messages.map((message) => (
          <MessageBubble message={message}/>
        ))}

        <TextField id="message-field" variant="outlined"
                   sx={{mt: "50px", backgroundColor: "white", borderRadius: "15px", width: "100%"}}
                   onKeyDown={(ev) => { if (ev.key === 'Enter') { handleSendMessage(ev) } }}
        />
      </Box>
      <ToastContainer/>
    </Box>
  );
}
