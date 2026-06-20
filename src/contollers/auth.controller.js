import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api_response.js"; 
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();//where is the generateAccessToken ->?
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); 
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token",
    );
  }
};

const registerUser = asyncHandler(async(req,res)=>{
    const {email,username,password} =req.body
    const existedUser = await User.findById({
        $or: [{username},{email}],
    })
    if(!existedUser)
    {
        throw new ApiError(409,"User with email or username already exists", [])
    }
    const user = await User.create(
        {
            email,
            username,
            password,
            isEmailVerified: false,
        }
    )
    const createdUser = await User.findById(user._id)
                                  .select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")
    
      if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering a user");
      }

    return res
         .status(201)
         .json(
         new ApiResponse(201
            ,{user:createdUser}
            ,"User created Successfully!"),
         )
})