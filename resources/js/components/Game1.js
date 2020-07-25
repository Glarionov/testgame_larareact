import React, { Component } from 'react';
import QuestionOption from "./QuestionOption";
// import { TweenMax, TweenLite } from "react-gsap";
import { TweenMax, TweenLite } from "gsap";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import { withRouter } from "react-router";

class Game1 extends React.Component {


    constructor(props) {
        super(props);

        // let { groupIdFromRoute } = useParams();

        const groupIdFromRoute = this.props.match.params.id;

        console.log('groupIdFromRoute',groupIdFromRoute); //todo r
        console.log('TweenMax',TweenMax); //todo r
        this.changeHandler = this.changeHandler.bind(this)


        let movingBoxes = {

        }




        let framesPerSecond = 20;

        let animationFrequency = 1000 / framesPerSecond;

        let speedPerSecond = 700;

        let speedPerFrame = speedPerSecond / framesPerSecond;

        this.data = {
            speed: speedPerFrame,
            animationFrequency,
            animationFrequencyMs: animationFrequency / 1000,
            boxWidth: 1200,
            boxHeight: 800,
            goodAnswerScoreChange: 10,
            badAnswerScoreChange: -5,
            bouncyMode: true
        }
        this.state = {
            playerData: {
                marginLeft: 0
            },
            playerX: 100,
            playerY: 666,
            playerWidth: 50,
            playerHeight: 50,
            movingBoxWidth: 100,
            movingBoxHeight: 100,
            vertSpeed: 0,
            horSpeed: 0,
            speed: 10,
            movingBoxes: movingBoxes,
            lastBoxIndex: 1,
            score: 0,
            questions: [],
            currentQuestionIndex: 0,
            currentQuestion: {},
            fallAcceleration: 10,
            movingBoxesFallingAcceleration: 7,
            fallSpeedLimit: 70,
            bouncyJumpSpeed: -110,
            bouncyJumpSpeedMovingBox: -80,
            bouncyMode: true,
            bottomGrassStyle: {},
            boxAppearType: 'ghostWalls',
            boxAppearTypes: ['fromRight', 'pureRandom', 'bouncy', 'ghostWalls'],
            additionalBoxAppearType: '',
            boxIntervalByAppearType: {
                fromRight: 1000,
                pureRandom: 700,
                bouncy: 1000,
                ghostWalls: 3000
            },
            fieldStyle: {
                height: this.data.boxHeight,
                width: this.data.boxWidth
            },
            enemyAppearInterval: 2000,
            changeEnemyAppearStyleInterVal: 60000
        }


        // reference to the DOM node
        this.myElement = null;

        this.movingBoxesRefs = [];

        for (let i in movingBoxes) {
            this.movingBoxesRefs[i] = null;
        }
        // reference to the animation
        this.myTween = null;

        this.playerElement = null;



        setInterval(this.gameIteration.bind(this), animationFrequency);
        // setInterval(this.testAnimation.bind(this), 4140);

        this.state.enemyAppearInterval = this.state.boxIntervalByAppearType[this.state.boxAppearType];

        // this.setState({
        //     enemyAppearInterval: newBoxInterval
        // });

        setTimeout(this.makeNewBoxCycle.bind(this), this.state.enemyAppearInterval);

        setTimeout(this.changeEnemyAppearStyle.bind(this), this.state.changeEnemyAppearStyleInterVal);

        setInterval(this.changeQuestion.bind(this), 20000);
        // setInterval(this.changeQuestion.bind(this), 2000);
    }

    changeEnemyAppearStyle(appearType = false) {

        if (!appearType) {
            let randValue = Math.random();

            let mult = randValue * this.state.boxAppearTypes.length;
            let ceilMult = Math.floor(mult);

            let newIndex = ceilMult;
            appearType = this.state.boxAppearTypes[newIndex];
        }


        this.setState({
            boxAppearType: appearType
        });

        let newBoxInterval;

        switch (this.state.boxAppearType) {
            case 'pureRandom':
                newBoxInterval = 700;
                break;
            case "fromRight":
            default:
                newBoxInterval = 1000;
        }

        console.log('appearType',appearType); //todo r
        if (appearType === 'ghostWalls') {
            this.setState({
                additionalBoxAppearType: 'ghostFloors'
            });
            this.makeNewAdditionalBoxCycle();
            // setTimeout(this.makeNewAdditionalBoxCycle.bind(this), 1000);
        } else {
            this.setState({
                additionalBoxAppearType: ''
            })
        }




        this.setState({
            enemyAppearInterval: this.state.boxIntervalByAppearType[this.state.boxAppearType]
        });

        setTimeout(this.changeEnemyAppearStyle.bind(this), this.state.changeEnemyAppearStyleInterVal);
    }

    changeQuestion() {
        if (this.state.questions.length < 2) {
            return true;
        }

        let newIndex = this.state.currentQuestionIndex;
        while (newIndex == this.state.currentQuestionIndex || typeof this.state.questions[newIndex] == "undefined") {
            newIndex = Math.floor(Math.random() * this.state.questions.length);

        }



        this.setState({
            currentQuestionIndex: newIndex,
            currentQuestion: this.state.questions[newIndex],
            movingBoxes: {},
            movingBoxesRefs: {}
        })


    }

    makeNewBoxCycle() {
        this.makeNewBox(this.state.boxAppearType);
        setTimeout(this.makeNewBoxCycle.bind(this), this.state.enemyAppearInterval);
    }

    makeNewAdditionalBoxCycle() {
        console.log('this.state.additionalBoxAppearType',this.state.additionalBoxAppearType); //todo r
        if (this.state.additionalBoxAppearType) {
            this.makeNewBox(this.state.additionalBoxAppearType);
            setTimeout(this.makeNewAdditionalBoxCycle.bind(this), 5000);
        }
    }

    killMovingBox(id) {
        let movingBoxes = this.state.movingBoxes;
        delete movingBoxes[id]
        this.setState({
            movingBoxes
        })
        delete this.movingBoxesRefs[id]
    }

    changeGhostMode(key, newMode = false) {
        console.log('key',key); //todo r

        console.log('this.state.movingBoxes',this.state.movingBoxes); //todo r
        if (typeof this.state.movingBoxes[key] !== "undefined") {
            let movingBoxes = this.state.movingBoxes;
            movingBoxes[key].ghostMode = newMode;
            this.setState({
                movingBoxes
            });
            if (newMode) {
                TweenLite.to(this.movingBoxesRefs[key], 0, {opacity: 0.5});
            } else {
                TweenLite.to(this.movingBoxesRefs[key], 0, {opacity: 0.9});
            }
        }
    }

    swingGhostMode(key) {
        if (typeof this.state.movingBoxes[key] !== "undefined") {
            let movingBoxes = this.state.movingBoxes;
            movingBoxes[key].ghostMode = !movingBoxes[key].ghostMode;
            this.setState({
                movingBoxes
            });
            let timeDelay = 1000;
            if (movingBoxes[key].ghostMode) {
                TweenLite.to(this.movingBoxesRefs[key], 0, {opacity: 0.5});
            } else {
                TweenLite.to(this.movingBoxesRefs[key], 0, {opacity: 0.9});
                timeDelay+= Math.random() * 600;
            }

            setTimeout(function(key){
                this.swingGhostMode(key);
            }.bind(this), timeDelay, key);
        }
    }

    makeNewBox(boxAppearType = 'pureRandom') {
        let movingBoxes = this.state.movingBoxes;

        let x, y, hs, vs;
        console.log('this.state.boxAppearType',this.state.boxAppearType); //todo r
        let boxOpacity = 1;
        let ghostMode = false;
        let newBoxIndex = this.state.lastBoxIndex + 1;

        let height = this.state.movingBoxHeight;
        let width = this.state.movingBoxWidth;

        switch (boxAppearType) {
            case 'pureRandom':
                x = Math.floor(Math.random() * this.data.boxWidth);
                y = Math.floor(Math.random() * this.data.boxHeight);
                hs = Math.floor(Math.random() * 16 - 8);
                vs = Math.floor(Math.random() * 16 - 8);
                boxOpacity = 0.6;
                ghostMode = true;
                setTimeout(function(newBoxIndex){
                    this.changeGhostMode(newBoxIndex, false);
                }.bind(this), 1000, newBoxIndex);
                break;
            case "fromRight":
                x = this.data.boxWidth - this.state.movingBoxWidth;
                y = Math.floor(Math.random() * (this.state.fieldStyle.height - this.state.movingBoxHeight));
                hs = Math.floor(Math.random() * -7 - 9);
                vs = 0;
                break;
            case 'ghostWalls':
                x = this.data.boxWidth - this.state.movingBoxWidth;
                y = 0 ;
                vs = 0;
                hs = Math.floor(Math.random() * -7 - 9);

                height = this.data.boxHeight;

                boxOpacity = 0.6;
                ghostMode = true;

                setTimeout(function(newBoxIndex){
                    this.swingGhostMode(newBoxIndex);
                }.bind(this), Math.random() * 500, newBoxIndex);
                break;

            case 'ghostFloors':
                x = 0;

                hs = 0;
                vs = 0;
                width = this.data.boxWidth;
                boxOpacity = 0.6;
                ghostMode = true;
                height = this.state.movingBoxHeight / 2;
                y = this.data.boxHeight - height - 1;
                // y = this.data.boxHeight - 100;


                setTimeout(function(newBoxIndex){
                    this.killMovingBox(newBoxIndex);
                }.bind(this), 4500, newBoxIndex);

                setTimeout(function(newBoxIndex){
                    this.swingGhostMode(newBoxIndex);
                }.bind(this), 2000, newBoxIndex);

                break;
            case 'bouncy':
                y = Math.floor(Math.random() * this.data.boxHeight);
                vs = 0;
                hs = Math.floor(Math.random() * 18 - 9);
                let minSpeed = 7;
                if (Math.abs(hs) < minSpeed) {
                    hs = minSpeed * Math.abs(hs);
                    if (hs === 0) {
                        hs = 7;
                    }
                }
                if (hs > 0) {
                    x = 0;
                } else {
                    x = this.data.boxWidth - this.state.movingBoxWidth;
                }
                break;

        }




        this.movingBoxesRefs[newBoxIndex] = {
            x: x + 'px',
            y: y + 'px',
            opacity: boxOpacity
        };

        console.log('newBoxIndex',newBoxIndex); //todo r

        console.log('this.movingBoxesRefs[newBoxIndex]',this.movingBoxesRefs[newBoxIndex]); //todo r
        console.log('this.currentQuestion.options',this.state.currentQuestion.options); //todo r
        let optionKeys = Object.keys(this.state.currentQuestion.options);

        let rKey = optionKeys[Math.floor(Math.random() * optionKeys.length)];

        console.log('rKey',rKey); //todo r

        let newText = this.state.currentQuestion.options[rKey].option_name;
            // this.state.currentQuestion.options[Math.floor(Math.random() * Object.keys(this.state.currentQuestion.options).length)].option_name;

        let optionData = this.state.currentQuestion.options[rKey];
        if (boxAppearType === 'ghostFloors') {
            optionData = {
                option_name: "DON'T TOUCH"
            }
        }
        console.log('newText',newText); //todo r
            movingBoxes[newBoxIndex] =
            {
                x: x,
                y: y,
                hs: hs,
                vs: vs,
                opacity: boxOpacity,
                ghostMode,
                height,
                width,
                optionData
            };



            this.setState({
                movingBoxes: movingBoxes,
                lastBoxIndex: newBoxIndex
            })

        // TweenLite.to(this.movingBoxesRefs[boxKey],
        //     this.data.animationFrequencyMs,
        //     {
        //         opacity: 0.5,

        console.log('height',height); //todo r
        TweenLite.to(this.movingBoxesRefs[newBoxIndex], 0,
            {marginLeft: x,marginTop: y, ease: "linear",
                opacity: boxOpacity,
                height,
                width,
                display: 'flex'});
    };

    testAnimation() {
        // TweenLite.to(this.state.playerX, 1, {width: 100, backgroundColor: "green"});
    }

    async componentDidMount() {

        document.addEventListener("keydown", this._handleKeyDown.bind(this));
        document.addEventListener("keyup", this._handleKeyUp.bind(this));

        // let { groupId } = useParams();

        // console.log('groupId',groupId); //todo r

        const groupIdFromRoute = this.props.match.params.id;

        let groupId;
        groupId = groupIdFromRoute;
            /* fetch API in action */
            let data = {e: 'f'};
            let url = '/api/get-question-group/' + groupId;

            let qData = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    return data.questionsByGroup;
                });

            console.log('qData',qData); //todo r
            console.log('qData.length',qData.length); //todo r
        let rKey = Math.floor(Math.random() * qData.length);

        console.log('rKey',rKey); //todo r
            qData['clicked_options'] = [];
            this.setState({
                questions: qData,
                currentQuestionIndex: rKey,
                currentQuestion: qData[rKey]
            });
        this.changeEnemyAppearStyle('ghostWalls');//changeEnemyAppearStyle
    }

    _handleKeyDown  (event) {

        let needPrevent = true;
        console.log('event.keyCode',event.keyCode); //todo r
        switch( event.keyCode ) {
            case 37: case 65:
                let newSpeed = -1 * this.data.speed
                this.setState(
                    {
                        horSpeed: newSpeed
                    }
                );
                break;
            case 38: case 87:

                if (this.state.bouncyMode) {
                    this.state.fallAcceleration = 2;
                    if (this.state.vertSpeed < 0) {
                        this.setState({
                            vertSpeed: 0
                        })
                    }

                    this.setState({
                        fallSpeedLimit: 10,
                    })

                } else {
                    let newSpeed2 = -1 * this.data.speed;
                    this.setState(
                        {
                            vertSpeed: newSpeed2
                        }
                    );
                }


                break;
            case 39: case 68:
                this.setState(
                    {
                        horSpeed: this.data.speed
                    }
                );
                break;
            case 40:
            case 83:

                if (this.state.bouncyMode) {

                    if (this.state.vertSpeed < 0) {
                        this.setState({
                            vertSpeed: 0
                        })
                    }

                    this.setState({
                        fallSpeedLimit: 70,
                        fallAcceleration: 15
                    })
                } else {
                    this.setState(
                        {
                            vertSpeed: this.data.speed
                        }
                    );
                }


                break;

            default:
                needPrevent = false;
                break;
        }
        if (needPrevent) {
            event.preventDefault();
        }
    }

    _handleKeyUp  (event) {
        let needPrevent = true;
        switch( event.keyCode ) {
            case 74:
                this.setState(prevState => {
                    return {
                        bouncyMode: !prevState.bouncyMode,
                        horSpeed: 0,
                        vertSpeed: 0
                    }
                })
                break;

            case 37: case 65:
                if (this.state.horSpeed < 0) {
                    this.setState(
                        {
                            horSpeed: 0
                        }
                    );
                }

                break;
            case 38: case 87:
                if (!this.state.bouncyMode) {
                    if (this.state.vertSpeed < 0) {
                        this.setState(
                            {
                                vertSpeed: 0
                            }
                        );
                    }
                }
                break;
            case 39: case 68:
                if (this.state.horSpeed > 0) {
                    this.setState(
                        {
                            horSpeed: 0
                        }
                    );
                }
                break;
            case 40: case 83:
                if (!this.state.bouncyMode) {
                    if (this.state.vertSpeed > 0) {
                        this.setState(
                            {
                                vertSpeed: 0
                            }
                        );
                    }
                }
                break;

            default:
                needPrevent = false;
                break;
        }
        if (needPrevent) {
            event.preventDefault();
        }
    }

    gameIteration() {
        // console.log('this.playerData', this.playerData); //todo r
        // this.playerData.marginLeft += 10;
        // this.setState({
        //         playerData: {
        //             marginLeft: this.state.playerData.marginLeft + 10
        //         }
        //     }
        // );



        if (this.state.bouncyMode) {
            let vs = this.state.vertSpeed;
            if (vs < this.state.fallSpeedLimit) {
                vs += this.state.fallAcceleration;
            } else {
                vs = this.state.fallSpeedLimit;
            }
            //
            // console.log('this.state.playerY',this.state.playerY); //todo r

            let vChange = this.state.vertSpeed;
            if (this.state.playerY > this.state.fieldStyle.height - this.state.playerHeight - this.state.vertSpeed) {
                vChange = this.state.fieldStyle.height - this.state.playerHeight - this.state.playerY;
                vs = this.state.bouncyJumpSpeed;
                this.setState({
                    fallAcceleration: 10,
                    fallSpeedLimit: 50
                })
            }
            this.setState({
                vertSpeed: vs
            })

            let hChange = this.state.horSpeed;
            if (this.state.playerX + hChange< 0 && hChange < 0) {
                hChange = -1 * this.state.playerX;
            }

            console.log('this.state.playerX',this.state.playerX); //todo r
            console.log('this.state.playerWidth',this.state.playerWidth); //todo r
            let playerRightPosition = this.state.playerX + this.state.playerWidth;
            console.log('this.state.boxWidth',this.state.boxWidth); //todo r
            console.log('hChange',hChange); //todo r
            if (this.state.playerX + this.state.playerWidth + hChange> this.data.boxWidth && hChange > 0) {
                hChange = this.data.boxWidth - this.state.playerX - this.state.playerWidth;
            }

            this.setState(prevState => {
                return {
                    playerX: prevState.playerX + hChange,
                    playerY: prevState.playerY + vChange,
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    playerX: prevState.playerX + this.state.horSpeed,
                    playerY: prevState.playerY + this.state.vertSpeed,
                }
            })
        }

        TweenLite.to(this.playerElement, this.data.animationFrequencyMs, {marginLeft: this.state.playerX, marginTop: this.state.playerY, ease: "linear"});


        for (let boxKey in this.state.movingBoxes) {





            let newMovingBoxes = this.state.movingBoxes;
            let currentMovingBox = newMovingBoxes[boxKey];

            let vChange = currentMovingBox.vs;
            if (this.state.boxAppearType === 'bouncy') {
                currentMovingBox.vs += this.state.movingBoxesFallingAcceleration;
                if (currentMovingBox.y > this.state.fieldStyle.height - this.state.movingBoxHeight - currentMovingBox.vs) {
                    vChange = this.state.fieldStyle.height - this.state.movingBoxHeight - currentMovingBox.y;
                    currentMovingBox.vs = this.state.bouncyJumpSpeedMovingBox;
                }
            }

            newMovingBoxes[boxKey] = currentMovingBox;

            // newMovingBoxes[boxKey].x += newMovingBoxes[boxKey].hs;
            let newX = currentMovingBox.x + currentMovingBox.hs;
            // newMovingBoxes[boxKey].y += newMovingBoxes[boxKey].vs;
            let newY = currentMovingBox.y + vChange;



            let wasCollision = false;

            //ghostMode

            if (!this.state.movingBoxes[boxKey].ghostMode &&
                this.state.playerX < newX + currentMovingBox.width &&
                this.state.playerX + this.state.playerWidth > newX &&
                this.state.playerY < newY + currentMovingBox.height &&
                this.state.playerY + this.state.playerHeight > newY) {
                console.log('collison!')
                delete newMovingBoxes[boxKey]
                delete this.movingBoxesRefs[boxKey]
                wasCollision = true;
                //goodAnswerScoreChange
                let scoreChange;

                if (currentMovingBox.optionData.good_answer) {
                    scoreChange = this.data.goodAnswerScoreChange;
                } else {
                    scoreChange = this.data.badAnswerScoreChange;
                }
                this.setState(prevState => {
                    return {
                        score: prevState.score + scoreChange,
                    }
                })
                // collision detected!
            }

            if (wasCollision || newX < 0 || newX > this.state.fieldStyle.width - currentMovingBox.width ||
                newY < 0 || newY > this.state.fieldStyle.height - currentMovingBox.height
            ) {
                // newMovingBoxes.splice(boxKey, 1);
                // this.movingBoxesRefs.splice(boxKey, 1);
                delete newMovingBoxes[boxKey]
                delete this.movingBoxesRefs[boxKey]
            } else {
                TweenLite.to(this.movingBoxesRefs[boxKey],
                    this.data.animationFrequencyMs,
                    {
                        // opacity: 0.5,
                        // display: 'block',
                        marginLeft: newX,marginTop: newY, ease: "linear"});

                newMovingBoxes[boxKey].x = newX;
                newMovingBoxes[boxKey].y = newY;


            }
            this.setState(prevState => {
                return {
                    movingBoxes: newMovingBoxes
                }
            })
        }

        // console.log('hello  I am game iteration')
        // setTimeout(this.gameIteration();}, 1000);
    }

    changeHandler (e) {
        if (typeof this.props.parentClickEvent === 'function') {
            this.props.parentClickEvent(e, this.props.index);
        }
    }


    render() {

        if(!this.state.currentQuestion)
        {
            return (<div>Loading</div>)
        }
        else
        return  (<div className="game1"
        >
            <div className="top-game-panel">
                <div className="question-name">
                    {this.state.currentQuestion.question_name}
                </div>
                Score: {this.state.score}


            </div>
            <div className="game-field-style" style={this.state.fieldStyle}>
            </div>




            <div className="player-div"
                 ref={div => this.playerElement = div}
                // style={ ({
                //     marginLeft: this.state.playerX + 'px',
                //     marginTop: this.state.playerY + 'px'
                // })}

            ></div>

            {Object.entries(this.state.movingBoxes).map(([index, optionData]) => (
                <div key={index} className="default-moving-box"
                ref={div => this.movingBoxesRefs[index] = div}
                >
                {optionData.optionData.option_name}
                </div>
                ))}


        </div>)
    }
}

export default Game1;
