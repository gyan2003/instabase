import {React,useState} from 'react'
import { Box,useTheme,useMediaQuery,Typography, Button,TextField } from '@mui/material'
import {LoadingButton} from '@mui/lab'
import Lottie from 'react-lottie';
import animationData from '../../lotties/kiss-of-the-heart.json'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { setLogin } from 'state'
import Dropzone from 'react-dropzone'
import loginImage from './loginImage.jpg'
 
 
import FlexBetween from 'components/FlexBetween'

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  
  {/*----Lottie Setup--------*/}
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };



  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",  
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} >
          <Box
            display="flex"
            justifyContent="space-around"
          >
            <Box display="flex" flexDirection="column"   alignItems="center" justifyContent="space-around">
              <Box display="flex" flexDirection="column"   paddingLeft="2vh" paddingTop="6vh">
            {isRegister && (
              <>
                <TextField
                  variant="standard"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2",margin:"0.5rem",color:"black",outlineColor:"black" ,".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                    borderColor: "black"
                } }}
                />
                <TextField
                   
                  variant="standard"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" ,margin:"0.5rem",color:"black",outlineColor:"black" ,".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                    borderColor: "black"
                }}}
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MyLocationIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" ,margin:"0.5rem",color:"black",outlineColor:"black" ,".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                    borderColor: "black"
                }}}
                />
                <TextField
                  variant="standard"
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 2" ,margin:"0.5rem",color:"black",outlineColor:"black" ,".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                    borderColor: "black"
                }}}
                />
                <Box
                  gridColumn="span 2"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}

              sx={{ gridColumn: "span 4" ,margin:"0.6rem",".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                borderColor: "black"
            }}}
            />
            <TextField 
               InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" ,margin:"0.5rem",color:"black",outlineColor:"black" ,".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
                borderColor: "black"
            }}}
            />
          </Box>

          {/* BUTTONS */}
          <Box padding="1rem">
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                ml:"2.2rem",
                p: "0.5rem",
                width:"14vw",
                backgroundColor: palette.primary.dark,
                color: palette.background.alt,
                "&:hover": { color:"black" ,border:"0.5px solid transparent" ,bgcolor:palette.primary.main,zIndex:"99",cursor:"pointer"},
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.dark,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
          </Box>
          {isNonMobile&&(
                <Box marginLeft="4rem">
                 <Lottie options={defaultOptions} height="320px" width="320px"/>
               </Box>
          )}
         
          </Box>
        </form>
      )}
    </Formik>

  );
};


export default Form