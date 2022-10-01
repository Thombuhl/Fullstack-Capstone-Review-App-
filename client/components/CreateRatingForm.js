import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
import { createRating } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { fetchPreferences } from '../store/preference';

const CreateRatingForm = (props) => {
    const dispatch = useDispatch();
    const {
        auth: { auth },
    } = useSelector((state) => state);
    const { restaurantId } = props;

    const [newRating, setNewRating] = useState({
        score: 0,
        comment: '',
        preferenceId: null,
    });
    const [allPref, setNewPref] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const prefData = await dispatch(fetchPreferences());
            // console.log(prefData.payload);
            setNewPref(prefData.payload);
        };
        fetchData();
    }, []);

    const { score, comment, preferenceId } = newRating;
    const onChange = (e) => {
        // console.log(e.target.name, e.target.value);
        setNewRating({ ...newRating, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            createRating({
                ...newRating,
                userId: auth.id,
                restaurantId: restaurantId,
            })
        );
    };

    return (
        <div className="card my-3 py-3 text-left">
        <Form onSubmit={handleSubmit}>
    <div class="row g-1 align-items-center justify-content-left">
        <div class='col-auto'>
            <strong className="card-title" style={{color:"#454343"}} >Start a Review</strong>
        </div>
        <div className="container col-auto w-50">
            <Form.Select
                name="preferenceId"
                aria-label="Default select example"
                onChange={onChange}
            >
                <option value="">Pick Your Review Catagory</option>
                {allPref?.map((preference) => (
                    <option key={preference.id} value={preference.id}>
                        {preference.name}
                    </option>
                ))}
            </Form.Select>
        </div>
    </div>
    <div className="row g-1 align-items-center">
        <div className="col-auto">          
             <strong className='' style={{color:"#454343"}}>I will give {score}</strong>
         </div>
        <div className="col-auto w-25">
            <Form.Range
                min="1"
                max="5"
                step="1"
                value={score}
                name="score"
                onChange={onChange}
            />
            
        </div>
    </div>
    <div className="row g-1 align-items-end">
        <div className="col-auto container ">
            <Form.Group className="w-100">

                <Form.Control
                    as="textarea"
                    value={comment}
                    name="comment"
                    placeholder="Type Your Comment"
                    onChange={onChange}
                 
                />
            </Form.Group>
        </div>
        <div className="col-auto align-bottom">
            <Button
                disabled={!score || !comment || !preferenceId}
                // variant="primary"
                type="submit"
            >
                Submit
            </Button>
        </div>
    </div>
        </Form>
        </div>
    );
};

export default CreateRatingForm;
