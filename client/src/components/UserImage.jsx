import { Box } from "@mui/material";
import { motion } from "framer-motion";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size} sx={{":hover":{cursor:"pointer"}}}>
      <motion.img
        whileHover={{
          scale: 1.2,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
              
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://instabase-1.onrender.com/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;