
// import mongoose from "mongoose";

// const connectDb = async () => {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error("MONGO_URI is not defined in environment variables");
//     }
    
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error("MongoDB Connection Error", error);
//     process.exit(1);
//   }
// };

// export default connectDb;

import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      // Add connection options for better reliability
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      if ('code' in error) {
        console.error("Error code:", (error as any).code);
      }
    }
    // Log the full error object in development
    if (process.env.NODE_ENV !== 'production') {
      console.error("Full error:", error);
    }
    process.exit(1);
  }
};

export default connectDb;
