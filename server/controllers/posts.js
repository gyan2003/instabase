import Posts from '../models/Posts.js'
import User from '../models/User.js';

export const createPost=async (req,res)=>{
   
    try{
     const {userId,picturePath,description}=req.body;

     const user=await User.findById(userId);

     const newPost=new Posts({
        
        userId,
        firstName:user.firstName,
        lastName:user.lastName,
        location:user.location,
        userPicturePath:user.picturePath,
        picturePath,
        description,
        likes:{},
        comments:[]

     });
     
     await newPost.save();

     const posts=await Posts.find();

     res.status(201).json(posts);

    }catch(err){
        res.status(409).json({error:err.message});
    }
};


/*-------GET FEED POSTS------ */

export const getFeedPosts=async (req,res)=>{
    try{
        const posts=await Posts.find();
        res.status(201).json(posts);

    }catch(err){
        res.status(404).json({error:err.message});
    }
}

/*---GET USER POSTS---- */

export const getUserPosts=async (req,res)=>{
    try{
      const {userId}=req.params;
      
      const userPosts= await Posts.find({userId});
      
      res.status(201).json(userPosts);
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
}


/*--------Like Post-----*/

export const likePost=async (req,res)=>{
    try{
         const {id}=req.params;
         const {userId}=req.body;

         const post=await Posts.findById(id);
         const isLiked=post.likes.get(userId);

         if(isLiked){
            post.likes.delete(userId);
         }
         else{
            post.likes.set(userId,true);
         }

         const updatedPost=await Posts.findByIdAndUpdate(id,
          {
            likes:post.likes
          },
          {
            new:true
          }
         );

         res.status(200).json(updatedPost);
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
}
