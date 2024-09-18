import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionsState = mongoose.connection.readyState;

  if (connectionsState === 1) {
    console.log("Already connected");
    return;
  }
  if (connectionsState === 2) {
    console.log("Connecting...");
    return;
  }
  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "rest-apis-nextjs14",
      bufferCommands: true,
    });
    console.log("Connected.");
  } catch (err: any) {
    console.log("Error :", err);
    throw new Error("Error : ", err);
  }
};

export default connect;
