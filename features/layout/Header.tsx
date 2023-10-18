import Link from 'next/link';
import Image from 'next/image';
import { useMounted } from '@/hooks';
import { Box, Button, MenuItem, Menu, Divider, Avatar } from '@mui/material';
import { HeaderContainer } from '@components/common/HeaderContainer';
import ThemeSwitcher from '@/features/theme/ThemeSwitcher';
import { Row } from '@components/common/SComponents';
import { useContext, useState } from 'react';
import { ConnectWalletModal } from 'components/ConnectWalletModal.tsx/ConnectWalletModal';
import { useChain } from '@cosmos-kit/react';
import { Context } from '@/src/context';
import { PersonAdd, Settings, Logout } from '@mui/icons-material';
import ListItemIcon from '@mui/material/ListItemIcon';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const { walletAddress, updateWalletAddress } = useContext(Context);
  const { connect, disconnect } = useChain('aura');
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }
  const handleDisconnect = () => {
    updateWalletAddress('');
    if (disconnect) {
      disconnect();
    } else {
      console.log('Disconnect function not available');
      // Handle the scenario when disconnect is not available
    }
  };

  return (
    <HeaderContainer className='bg-black flex'>
      <Box alignItems="center">
        <Box sx={{ width: 112, cursor: 'pointer' }}>
          <img
            src="/logo.png"
            style={{ width: '40px', height: '40px' }}
            alt="logo"
          />
        </Box>
      </Box>

      <Row $justifyContent="flex-end">
        {/* <ThemeSwitcher />
        <Row>
          <Button onClick={() => handleChangeLanguage('vi')}>vi</Button>
          <Button onClick={() => handleChangeLanguage('en')}>en</Button>
        </Row> */}
        {walletAddress ? (
          <Button
            onClick={handleOpenMenu}
            variant="outlined"
            className="text-xs leading-[15px] font-bold"
          >
            {walletAddress}
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="text-xs leading-[15px] font-bold"
            onClick={() => connect()}
          >
            connect
          </Button>
        )}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
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
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleCloseMenu}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleDisconnect}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Disconnect
          </MenuItem>
        </Menu>
      </Row>
    </HeaderContainer>
  );
};

export default Header;
