import * as dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  mongoConntectionString: process.env.MONGODB_ATLAS_URL,
};

export const connectionConfig = {
  port: process.env.PORT || 5000,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
};
