import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { ClassNames } from '@emotion/react';
import { commentPost } from '../actions/matchActions'
import '../styles/matches.css'
import ErrorMessage from "../components/ErrorMessage";

const CommentMatch = ({ match }) => {
    const [comments, setComments] = useState(match?.comments);
    const [comment, setComment] = useState('')
    const [commentLength, setcommentLength] = useState(false);
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const commentsRef = useRef();


    /**
     * This function handles comment event when user enters comment.
     * If comment length is no longer than 50 characters it sets
     * comment list.
     */
    const handleClick = async () => {

        if (comment.length > 50) {
            setcommentLength(true);
        }
        else {
            setcommentLength(false);
            const finalComment = userInfo.username + ': ' + comment;
            const newComments = await dispatch(commentPost(finalComment, match._id))
            setComments(newComments);
            setComment('');

            commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            {commentLength ?
                <ErrorMessage variant="danger">
                    You can't enter comment longer than 50 characters.
								</ErrorMessage> : null}
            <div className="commentsOuterConteiner">
                <div className="commentsInnerContainer">
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            {c}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {userInfo && (
                    <div stlye={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" onClick={handleClick}>
                            Comment
                </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentMatch