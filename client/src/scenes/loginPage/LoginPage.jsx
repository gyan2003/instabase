import {React,useState} from 'react'
import { Box,div,useTheme,useMediaQuery,Typography,IconButton } from '@mui/material'
import { DarkMode,LightMode, } from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween'
import { useSelector,useDispatch } from 'react-redux';
import state, {setMode } from '../../state/index'
import Form from './Form'
 

const LoginPage = () => {
  const theme=useTheme();
  const isNonMobileScreens=useMediaQuery("(min-width:1000px)");
  const dispatch=useDispatch();
  const neutralLight=theme.palette.neutral.light;
  const dark=theme.palette.neutral.dark;

  return (
    <Box width="100%">
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="0.5rem 6%"
        textAlign="center"
        display="flex"
        justifyContent="space-between"
      >
        <Typography fontWeight="600" fontSize="1.6rem" color={theme.palette.mode==='dark'?'white':'black'}>
          InstaBase
        </Typography>
        <IconButton onClick={()=>dispatch(setMode())}>
           {theme.palette.mode==='dark'?(
            <DarkMode sx={{fontSize:"22px"}}/>
           ):(
            <LightMode sx={{color:"dark",fontSize:"22px"}}/>
           )}
         </IconButton>
      </Box>

      <Box
        width={isNonMobileScreens?"70%":"93%"}
        height= "122vh"
        bgcolor={theme.palette.background.alt}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        
        
        <Box display="flex" alignItems="center" justifyContent="center">
         <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          A simple, fun & creative way to capture & share photos & videos with friends & family!
         </Typography>
         
        </Box>
      
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage