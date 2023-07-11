import React from 'react'
import { Box,useMediaQuery,Divider} from '@mui/material'
import { useSelector } from 'react-redux'
import Navbar from 'scenes/navbar/Navbar'
import UserWidget from 'scenes/widgets/UserWidget'
import MyPostWidget from 'scenes/widgets/MyPostWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'
import FriendListWidget from 'scenes/widgets/FriendListWidget'

const HomePage = () => {
  const isNonMobileScreen=useMediaQuery("(min-width:1000px)");
  const {_id,picturePath}=useSelector((state)=>state.user);
  console.log(_id);
  return (
     <Box>
       <Navbar/>
       <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen?"flex":"block"}
        gap="0.5rem"
        justifyContent="space-around"
       >
        <Box flexBasis={isNonMobileScreen?"26%":undefined}>
          <UserWidget userId={_id} picturePath={picturePath}/>
         
          <FriendListWidget userId={_id}/>
        </Box>

        <Box flexBasis={isNonMobileScreen?"55%":undefined}
         mt={isNonMobileScreen?undefined:"2rem"}
        >
          <MyPostWidget/>
          <PostsWidget userId={_id}/>
        </Box>
      
         
         
       </Box>
     </Box>
  )
}

export default HomePage