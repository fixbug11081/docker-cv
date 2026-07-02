const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required to blacklist token"],
    },
  },
  { timestamps: true },
);

const blacklistTokenModel = mongoose.model(
  "blacklisttokens",
  blacklistTokenSchema,
);

module.exports = blacklistTokenModel;
