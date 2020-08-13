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
            playerWidth: 40,
            playerHeight: 40,
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
            paused: false,
            bottomGrassStyle: {},
            boxAppearType: 'fromRight',
            boxAppearTypes: [
                'pureRandom',
                'fromRight',
                // 'bouncy',
                // 'ghostWalls',
                'shootFromPoint',
                'wallWithHoles'
            ],
            showAnswersOfFirstQuestions: true,
            alreadyShowedAnswers: {},
            showAnswersBeforeStop: 1,
            additionalBoxAppearType: '',
            boxIntervalByAppearType: {
                fromRight: 700,
                pureRandom: 700,
                bouncy: 1400,
                shootFromPoint: 888,
                ghostWalls: 3000,
                wallWithHoles: 2000
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



        this.state.iterationInterval = setInterval(this.gameIteration.bind(this), this.data.animationFrequency);
        // setInterval(this.testAnimation.bind(this), 4140);

        if (typeof this.state.boxIntervalByAppearType[this.state.boxAppearType] !== 'undefined') {
            this.state.enemyAppearInterval = this.state.boxIntervalByAppearType[this.state.boxAppearType];
        } else {
            this.state.enemyAppearInterval = 1000;
        }


        // this.setState({
        //     enemyAppearInterval: newBoxInterval
        // });

        setTimeout(this.makeNewBoxCycle.bind(this), this.state.enemyAppearInterval * 2);

        // setTimeout(this.changeEnemyAppearStyle.bind(this), this.state.changeEnemyAppearStyleInterVal);

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
            let keys = Object.keys(this.state.questions);
            console.log('k!!!!!!!eys',keys); //todo r

            newIndex = keys[Math.floor(Math.random() * keys.length)];

            // newIndex = Math.floor(Math.random() * this.state.questions.length);

        }
console.log('333333newIndex',newIndex); //todo r


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

        if (typeof this.state.movingBoxes[key] !== "undefined") {
            let movingBoxes = this.state.movingBoxes;
            movingBoxes[key].ghostMode = newMode;
            this.setState({
                movingBoxes
            });
            if (newMode) {
                TweenLite.to(this.movingBoxesRefs[key], 0, {opacity: 0.4});
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

    makeNewBox(boxAppearType = 'pureRandom', params = {}) {
        let movingBoxes = this.state.movingBoxes;

        let x, y, hs, vs;
        let boxOpacity = 1;
        let ghostMode = false;
        let newBoxIndex = this.state.lastBoxIndex + 1;

        let height = this.state.movingBoxHeight;
        let width = this.state.movingBoxWidth;

        let newBoxParams = false;

        let rKey;
        if (typeof params.rKey !== 'undefined') {
            rKey = params.rKey;
        } else {
            console.log('this.state.currentQuestion',this.state.currentQuestion); //todo r
            let optionKeys = Object.keys(this.state.currentQuestion.options);
            rKey = optionKeys[Math.floor(Math.random() * optionKeys.length)];
        }


        let currentQuestionIndex = this.state.currentQuestionIndex;
        let optionData = this.state.currentQuestion.options[rKey];
        let styleForGoodOrBadAnswer = {};
        let alreadyShowedAnswers = this.state.alreadyShowedAnswers;
        let borderStyle = 'solid', borderWidth = 1, borderColor = 'rgba(0,0,0,0.2)';
        /*
                        borderWidth: borderWidth,
                borderColor: borderColor,
                borderStyle: borderStyle,
         */

        if (this.state.showAnswersOfFirstQuestions) {
            if (typeof this.state.alreadyShowedAnswers[currentQuestionIndex] === 'undefined') {
                this.state.alreadyShowedAnswers[currentQuestionIndex] = 1;
            } else {

                //optionData.good_answer
            }

            if (this.state.alreadyShowedAnswers[currentQuestionIndex] <= this.state.showAnswersBeforeStop) {
                borderWidth = 6;
                console.log('optionData',optionData); //todo r
                if (optionData.good_answer) {
                    if (typeof params['notCountingGoodAnswerShow'] === 'undefined' || !params['notCountingGoodAnswerShow']) {
                        alreadyShowedAnswers[currentQuestionIndex]++;
                    }
                    borderStyle = 'solid';
                } else {
                    borderStyle = 'dashed';
                }
            } else {
                borderWidth = 2;
            }
        }
        console.log('borderWidth',borderWidth); //todo r

        switch (boxAppearType) {
            case 'shootFromPoint':
                x = (this.data.boxWidth - width) / 2;
                y = (this.data.boxHeight - height) / 1.5;
                let speed = 13;
                let ang = Math.PI * 3/4 + Math.random() * Math.PI * 6/4;

                hs = Math.floor(speed * Math.cos(ang));
                vs = Math.floor(speed * Math.sin(ang));
                break;
            case 'pureRandom':
                x = Math.floor(Math.random() * (this.data.boxWidth - width - 5));
                y = Math.floor(Math.random() * (this.data.boxHeight - height - 5));
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
                hs = Math.floor(Math.random() * -14 - 9);
                vs = 0;
                break;

            case 'wallWithHoles':
                width /= 2;
                let holeHeight = 300;

                let holeY = Math.random() * (this.state.fieldStyle.height - holeHeight);


                let top = Math.random() > 0.5;
                let hCoef = top? 0: 0.5;
                x = this.data.boxWidth - this.state.movingBoxWidth;
                y = 0;
                vs = 0;
                // hs = Math.floor(Math.random() * -7 - 9);
                hs = -16;

                height = holeY;

                let bottomHeight = this.state.fieldStyle.height - holeY - holeHeight - 5;
                // let bottomHeight = 100;
                if (bottomHeight > 0) {
                    newBoxParams = {
                        x: x,
                        y: holeY + holeHeight,
                        width: width,
                        height: bottomHeight,

                        hs: hs,
                        vs: vs,
                        rKey,
                        notCountingGoodAnswerShow: true
                    };

                    // this.makeNewBox('byParams',
                    //     {
                    //         x: x,
                    //         y: holeY + holeHeight,
                    //         width: width,
                    //         height: bottomHeight,
                    //
                    //         hs: hs,
                    //         vs: vs
                    //     }
                    //     );
                }
                // return true;
                break;
            case 'byParams':

                x = params.x;
                y = params.y;
                width = params.width;
                height = params.height;
                hs = params.hs;
                vs = params.vs;
                rKey = params.rKey;
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
                hs = Math.floor(Math.random() * 16 - 8);
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



        let newText = this.state.currentQuestion.options[rKey].option_name;
            // this.state.currentQuestion.options[Math.floor(Math.random() * Object.keys(this.state.currentQuestion.options).length)].option_name;


        if (boxAppearType === 'ghostFloors') {
            optionData = {
                option_name: "DON'T TOUCH"
            }
        }
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
                lastBoxIndex: newBoxIndex,
                alreadyShowedAnswers
            })

        // TweenLite.to(this.movingBoxesRefs[boxKey],
        //     this.data.animationFrequencyMs,
        //     {
        //         opacity: 0.5,

        TweenLite.to(this.movingBoxesRefs[newBoxIndex], 0,
            {marginLeft: x,marginTop: y, ease: "linear",
                opacity: boxOpacity,
                height,
                width,
                borderWidth: borderWidth,
                borderColor: borderColor,
                borderStyle: borderStyle,
                display: 'flex'});

        if (newBoxParams) {
            this.makeNewBox('byParams',
                newBoxParams
            );
        }
    };

    testAnimation() {
        // TweenLite.to(this.state.playerX, 1, {width: 100, backgroundColor: "green"});
    }

    async componentDidMount() {

        document.addEventListener("keydown", this._handleKeyDown.bind(this));
        document.addEventListener("keyup", this._handleKeyUp.bind(this));

        // let { groupId } = useParams();


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

        let rKey;

        let optionKeys = Object.keys(qData);
        rKey = optionKeys[Math.floor(Math.random() * optionKeys.length)];

            console.log('******qData',qData); //todo r
            this.setState({
                questions: qData,
                currentQuestionIndex: rKey,
                currentQuestion: qData[rKey]
            });
        this.changeEnemyAppearStyle('fromRight');//changeEnemyAppearStyle
    }

    _handleKeyDown  (event) {

        let needPrevent = true;
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
            case 80:

                if (this.state.paused) {
                    this.setState(
                        {
                            paused: false
                        }
                    );


                    this.setState(
                        {
                            iterationInterval: setInterval(this.gameIteration.bind(this), this.data.animationFrequency)
                        }
                    );
                    // this.state.iterationInterval = setInterval(this.gameIteration.bind(this), this.data.animationFrequency);
                } else {
                    this.setState(
                        {
                            paused: true
                        }
                    );
                    clearInterval(this.state.iterationInterval);
                }
                //this.state.iterationInterval = setInterval(this.gameIteration.bind(this), this.data.animationFrequency);
                // this.setState(
                //     {
                //         paused: !this.state.paused
                //     }
                // );
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

            let playerRightPosition = this.state.playerX + this.state.playerWidth;
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

        let alreadyShowedAnswers = this.state.alreadyShowedAnswers;

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

                let newValue = {};
                if (currentMovingBox.optionData.good_answer) {
                    scoreChange = this.data.goodAnswerScoreChange;
                    newValue = {background: "#2de43b"};


                } else {

                    alreadyShowedAnswers[ this.state.currentQuestionIndex] -= 0.25;
                    scoreChange = this.data.badAnswerScoreChange;
                    newValue = {background: "red"};
                }
                TweenLite.to(this.playerElement,  newValue);

                setTimeout(function () {
                    TweenLite.to(this.playerElement,.5,  {background: "#9350ec"});
                }.bind(this),500);

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

        this.setState({alreadyShowedAnswers});

        //paused
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
