import styled from "styled-components";
import Input from "./Input";
import WhiteBox from "./Box";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import Textarea from "./UI/TextArea";
import Button from "./Button";
import axios from "axios";
import Spinner from "./Spinner";

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 5px;
`;

const Subtitles = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #eee;
  padding: 10px 0;
  h3{
    margin:3px 0;
    font-size:1rem;
    color:#333;
    font-weight: bold;
  }
  p{
    margin:0;
    font-size: 1rem;
    line-height: 1rem;
    color:#555;
  }
`;
const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time{
    font-size: 12px;
    color: #aaa;
  }
`;

export default function ProductReviews({ product }) {
    const [starValue, setValue] = useState(5);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        async function getReviews() {
             await axios.get(`/api/reviews?productId=${product._id}`).then(res => {
                setReviews(res.data)
            });
        }
        getReviews()
    }, [product])


    async function submitReview() {
        setReviewsLoading(true)
        const data = {
            title,
            review,
            rating: starValue,
            productId: product._id
        }
       
           await axios.post('/api/reviews', data).then(res => {
                alert("Review submitted successfully")
                setTitle("")
                setReview("")
                setValue(5)

                setReviewsLoading(false)
            });
        
        
    }


  return (
    <div>
      <Title>Product Reviews</Title>
      <ColsWrapper>
      <WhiteBox>
        <Subtitles>Add review</Subtitles>
        <Input onChange={e => setTitle(e.target.value)} placeholder="title"/>
        <Textarea placeholder="was it good?" onChange={e => setReview(e.target.value)}/>
        <Rating
  name="simple-controlled"
  value={starValue}
  precision={0.5}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
/>
<div>
    <Button primary onClick={submitReview}>Submit your review</Button>
</div>
      </WhiteBox>
      <WhiteBox>
        <Subtitles>All Reviews</Subtitles>
        {reviewsLoading && (
              <Spinner fullWidth={true} />
            )}
            {reviews.length === 0 && (
              <p>No reviews :(</p>
            )}
            {reviews.length > 0 && reviews.map(review => (
              <ReviewWrapper>
                <ReviewHeader>
                <Rating name="read-only" value={review.rating} readOnly />
                  <time>{(new Date(review.createdAt)).toLocaleString('sv-SE')}</time>
                </ReviewHeader>
                <h3>{review.title}</h3>
                <p>{review.review}</p>
              </ReviewWrapper>
            ))}
      </WhiteBox>
      </ColsWrapper>
    </div>
  );
}
