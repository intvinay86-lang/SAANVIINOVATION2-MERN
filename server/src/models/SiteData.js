import mongoose from "mongoose";

const siteDataSchema = new mongoose.Schema(
  {
    dataKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
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

// Index for faster queries
siteDataSchema.index({ dataKey: 1 });

const SiteData = mongoose.model("SiteData", siteDataSchema);

export default SiteData;
