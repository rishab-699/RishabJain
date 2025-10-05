import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Paragraph", "Paragraph+image", "image+Paragraph", "image/Paragraph"],
      required: true,
    },
    paragraph: {
      type: String,
      default: "",
    },
    img: {
        url: { type: String },
        width: { type: Number },
        height: { type: Number },
        size: { type: Number }
    }
  },
  { _id: false } // optional, no _id for individual sections
);

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    heroImg: {
        url: { type: String },
        width: { type: Number },
        height: { type: Number },
        size: { type: Number }
    },
    sections: {
      type: [SectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;
