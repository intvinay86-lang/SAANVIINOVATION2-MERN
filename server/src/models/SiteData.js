import mongoose from "mongoose";

const siteDataSchema = new mongoose.Schema(
  {
    dataKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "main",
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const SiteData = mongoose.model("SiteData", siteDataSchema);

export default SiteData;
