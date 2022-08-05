import mongoose  from "mongoose";

const postSchema = new mongoose.Schema(
    {
        onwer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        image: {
            type: String,
            trim: true,
        },
        post: {
            type: String,
            // required: true,
            trim: true,
        },
        repost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        likeUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        likes: {
            type: Number,
            default: 0,
        },
        commentId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }],
        color: {
            type: String,
            trim: true,
        },
        comments: {
            type: Number,
            default: 0,
        },
        isSaved: Boolean,
        isHidden: Boolean,
        hasHashtag: Boolean,
        hasMention: Boolean,
    },
    {
        timestamps: true,
    }
);

export default  mongoose.model("Post", postSchema);