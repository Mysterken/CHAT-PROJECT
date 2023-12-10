import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {getUserId, getUserName, removeUserId, removeUserName, updateUser} from "../../API/security.js";
import {Settings} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {Modal} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function LoginAvatarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [firstLetterUsername, setFirstLetterUsername] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  function logout() {
    removeUserId();
    removeUserName();

    window.location.href = "/login";
  }

  function modifyAccount() {
    // open a modal to modify the username and password
    setOpenModal(true);
  }

  function sendModifyAccount() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let userId = getUserId();

    updateUser(userId, username, password)
      .then(() => {
        removeUserId();
        removeUserName();

        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    let username = getUserName();
    if (username) {
      setFirstLetterUsername(username.charAt(0).toUpperCase());
    }
  }, []);

  return (
    <React.Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ml: 2}}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar>{firstLetterUsername}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem onClick={modifyAccount}>
          <ListItemIcon>
            <Settings fontSize="small"/>
          </ListItemIcon>
          Modify account
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="black">
            Modify account
          </Typography>

          <Box component="form" noValidate onSubmit={modifyAccount} sx={{mt: 3}}>
            <Grid container>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                  />
                </Grid>
                <br/>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={sendModifyAccount}
              >
                Modify
              </Button>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
