import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faPencil, faRuler, faCrow, faLeaf, faFan, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import logo from "../img/fnpp-logo3.png";
import Home_MyProgress from "../img/Home_MyProgress.png";
import Home_ToDoList from "../img/Home_ToDoList.png";
import Home_Community from "../img/Home_Community.png";
import MyPlants_Home from "../img/MyPlants_Home.png";
import MyPlants_Updates from "../img/MyPlants_Updates.png";
import MyPlants_Details from "../img/MyPlants_Details.png";
import MyPlants_updateProgress from "../img/MyPlants_updateProgress.png";
import Community_Home from "../img/Community_Home.png";
import Community_Individual from "../img/Community_Individual.png";
import Community_Leaderboard from "../img/Community_Leaderboard.png";

export default function HowItWorks() {
    const navigate = useNavigate();

    const handleContinue = () => { 
        navigate('/dashboard');
    };

    const [activeTab, setActiveTab] = useState('tab1');

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
            


    return (
        <main className="gradient">

            <Container className="pt-4">
                <div className="text-center">
                    <Link to="/"><img width="auto" height="210" className="logo" src={logo} alt="" /></Link>
                    <h1 className="mb-3">How It Works</h1>
                    <p>Brisbane City Council’s Free Native Plants program offers a range of plants to enable the community to cultivate a greener and more sustainable Brisbane. The native species provided through the program will help grow our city’s urban forest and support wildlife.</p>
                </div>
            </Container>

            <Container className="pt-4">
                <Nav tabs className="flex-wrap">
                    <NavItem className="col-6 py-2">
                        <NavLink
                            className={activeTab === 'tab1' ? 'active' : ''}
                            onClick={() => { toggle('tab1'); }}
                        >
                            <div className={activeTab === 'tab1' ? 'btn btn-green' : 'btn btn-outline'}>General</div>
                        </NavLink>
                    </NavItem>
                    <NavItem className="col-6 py-2">
                        <NavLink
                            className={activeTab === 'tab2' ? 'active' : ''}
                            onClick={() => { toggle('tab2'); }}
                        >
                            <div className={activeTab === 'tab2' ? 'btn btn-green' : 'btn btn-outline'}>Home</div>
                        </NavLink>
                    </NavItem>
                    <NavItem className="col-6">
                        <NavLink
                            className={activeTab === 'tab3' ? 'active' : ''}
                            onClick={() => { toggle('tab3'); }}
                        >
                            <div className={activeTab === 'tab3' ? 'btn btn-green' : 'btn btn-outline'}>My Plants</div>
                        </NavLink>
                    </NavItem>
                    <NavItem className="col-6">
                        <NavLink
                            className={activeTab === 'tab4' ? 'active' : ''}
                            onClick={() => { toggle('tab4'); }}
                        >
                            <div className={activeTab === 'tab4' ? 'btn btn-green' : 'btn btn-outline'}>Community</div>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Container>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="tab1">
                    <Container className="py-5">

                        <h3 className="mb-4">How to apply?</h3>

                        <div className="row">
                        <div className="col-2 number-heading">
                            <p>1.</p>
                        </div>
                        <div className="col-10">
                            <p>Visit a library (excluding pop-up libraries), mobile library, Regional Business Centre or ward office and present a paid rates notice or written authority from the current financial year from the property owner or property manager. Public housing and Defence Housing residents must provide evidence of a recent rental payment.</p>
                        </div>
                        <div className="col-2 number-heading">
                            <p>2.</p>
                        </div>
                        <div className="col-10">
                            <p>You will receive an approved stamped Free Native Plants voucher.</p>
                        </div>
                        <div className="col-2 number-heading">
                            <p>3.</p>
                        </div>
                        <div className="col-10">
                            <p>Visit a participating retail nursery and exchange your voucher for two free native plants.</p>
                        </div>
                        </div>
                        
                    </Container>
                </TabPane>
                <TabPane tabId="tab2">
                    <Container className="py-5">

                        <h3>My Progress</h3>
                        <p>This panel presents the badges you've collected along your way.</p>
                        <img className="mb-4" width="auto" height="auto" src={Home_MyProgress} border="1px" />
                        
                        <h3>To-Do List</h3>
                        <p>List of reminders for taking care of your plants.</p>
                        <img className="mb-4" width="auto" height="auto" src={Home_ToDoList} border="1px" />
                        
                        <h3>My Community</h3>
                        <p>Showcasing the progress of your suburb.</p>
                        <img className="mb-4" width="auto" height="auto" src={Home_Community} border="1px" />
                    
                        
                    </Container>
                </TabPane>
                <TabPane tabId="tab3">
                    <Container className="py-5">

                        <p>Add all of your newly collected plants here to update and view their growth.</p>
                        <img className="mb-4" width="auto" height="auto" src={MyPlants_Home} border="1px" />
                        <h3>Plant Profiles</h3>
                        <h4>Updates</h4>
                        <p>Click into each individual plants to view list of actions to take care of them and every update you've posted.</p>
                        <img className="mb-4" width="auto" height="auto" src={MyPlants_Updates} border="1px" />
                        <h4>Details</h4>
                        <p>In details page, you will find descriptions of the plant and caring advises.</p>
                        <img className="mb-4" width="auto" height="auto" src={MyPlants_Details} border="1px" />
                        <h4>Post Updates</h4>
                        <p>You can post updates for your plants on various topics to either keep track of them yourself or share it with the community!</p>
                        <img className="mb-4" width="auto" height="auto" src={MyPlants_updateProgress} border="1px" />
                    </Container>
                </TabPane>
                <TabPane tabId="tab4">
                    <Container className="py-5">

                        <p>Check out the progress of other suburbs here, view the position your community is in and all the interesting badges that everyone's collecting!</p>
                        <img className="mb-4" width="auto" height="auto" src={Community_Home} border="1px" />
                        <h3>Leaderboard</h3>
                        <p>Suburbs competing with you and their current progress.</p>
                        <img className="mb-4" width="auto" height="auto" src={Community_Leaderboard} border="1px" />                        
                        <h3>Suburb page</h3>
                        <p>Showcasing the progress of specific suburb and interesting updates they have on thier plant buddies.</p>
                        <img className="mb-4" width="auto" height="auto" src={Community_Individual} border="1px" />
                    </Container>
                </TabPane>
            </TabContent>

            <Container>
                <div className="text-center">
                    <Button className="btn btn-green" onClick={handleContinue}>Skip to app</Button>
                </div>
            </Container>
        </main>
    );
}
