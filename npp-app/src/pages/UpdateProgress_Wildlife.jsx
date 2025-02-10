
import React, { useState, useEffect } from 'react';
import { Container, Button, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faArrowLeft, faCrow} from '@fortawesome/free-solid-svg-icons';

export default function UpdateProgress_Wildlife() {
    
    const size = [
        { value: 'one', label: 'Under 0.5 m' },
        { value: 'two', label: '0.5 m' },
        { value: 'three', label: '1 m' }
    ]
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const [comment, setComment] = useState('');
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <main className="has-menu">
            <Container className="pt-4">
                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/updatePlant" className="green-icon"><FontAwesomeIcon icon={faArrowLeft} className="icon" /></Link>
                    <div className="text-center">
                        <h1 className="mb-0">Myrtle</h1>
                        <p>Thyme honey myrtle</p>
                    </div>
                    <div className="darkgreen-circle-icon"><FontAwesomeIcon icon={faCrow} className="icon" /></div>
                </div>
            </Container>

            <Container>
                <h1 className="py-3 text-center">WildLife</h1>
                
                <div className="py-3 px-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {selectedImage && (
                        <div>
                            <h2>Preview</h2>
                            <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
                </div>

                <Input
                    className="py-5"
                    type="comment"
                    id="comment"
                    name="comment"
                    placeholder="Add comment here"
                    value={comment}
                    onChange={handleCommentChange}
                />
                <div className="text-center pt-5">
                    <Link to="">
                        <Button className="btn btn-green">Update</Button>
                    </Link>
                </div>
                <div className="py-5 d-flex align-items-center justify-content-between">
                    <div className="pt-2"></div>
                    <div>
                        <checkbox className="px-0">
                            <input type="checkbox" id="to-do-1" />
                        </checkbox>
                    </div>
                    <div className="text-center pt-3">
                        <p>Hide update from public activity</p>
                    </div>
                    <div className="pt-2"></div>
                </div>
                
                </Container>

            
        </main>
    );
}
