import React, { Component } from 'react';
import QuestionOption from "./QuestionOption";
// import { TweenMax, TweenLite } from "react-gsap";
import { TweenMax, TweenLite } from "gsap";
class Game1 extends React.Component {

    constructor(props) {
        super(props);
        console.log('TweenMax',TweenMax); //todo r
        this.changeHandler = this.changeHandler.bind(this)


        let movingBoxes = {

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
            fallAcceleration: 5,
            fallSpeedLimit: 70,
            bouncyMode: true
        }


        let framesPerSecond = 20;

        let animationFrequency = 1000 / framesPerSecond;

        let speedPerSecond = 700;

        let speedPerFrame = speedPerSecond / framesPerSecond;

        this.data = {
            speed: speedPerFrame,
            animationFrequency,
            animationFrequencyMs: animationFrequency / 1000,
            boxWidth: 1000,
            boxHeight: 600,
            goodAnswerScoreChange: 10,
            badAnswerScoreChange: -5,
            bouncyMode: true
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
        setInterval(this.makeNewBox.bind(this), 1000);
        setInterval(this.changeQuestion.bind(this), 15000);
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

    makeNewBox() {
        let movingBoxes = this.state.movingBoxes;

        let x = Math.floor(Math.random() * this.data.boxWidth),
            y = Math.floor(Math.random() * this.data.boxHeight)
        let newBoxIndex = this.state.lastBoxIndex + 1;
        this.movingBoxesRefs[newBoxIndex] = {
            x: x + 'px',
            y: y + 'px'
        };
        console.log('newBoxIndex',newBoxIndex); //todo r

        console.log('this.currentQuestion.options',this.state.currentQuestion.options); //todo r
        let optionKeys = Object.keys(this.state.currentQuestion.options);

        let rKey = optionKeys[Math.floor(Math.random() * optionKeys.length)];

        console.log('rKey',rKey); //todo r

        let newText = this.state.currentQuestion.options[rKey].option_name;
            // this.state.currentQuestion.options[Math.floor(Math.random() * Object.keys(this.state.currentQuestion.options).length)].option_name;

        console.log('newText',newText); //todo r
            movingBoxes[newBoxIndex] =
            {
                x: x,
                y: y,
                hs: Math.floor(Math.random() * 10 - 5),
                vs: Math.floor(Math.random() * 10 - 5),
                optionData: this.state.currentQuestion.options[rKey]
            };



            this.setState({
                movingBoxes: movingBoxes,
                lastBoxIndex: newBoxIndex
            })

        TweenLite.to(this.movingBoxesRefs[newBoxIndex], 0,
            {marginLeft: x,marginTop: y, ease: "linear", display: 'flex'});
    };

    testAnimation() {
        // TweenLite.to(this.state.playerX, 1, {width: 100, backgroundColor: "green"});
    }

    async componentDidMount() {
        document.addEventListener("keydown", this._handleKeyDown.bind(this));
        document.addEventListener("keyup", this._handleKeyUp.bind(this));

            /* fetch API in action */
            let data = {e: 'f'};
            let url = '/api/get-question-group/1';

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

            qData['clicked_options'] = [];
            this.setState({
                questions: qData,
                currentQuestion: qData[this.state.currentQuestionIndex]
            });

    }

    _handleKeyDown  (event) {
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
                break;
        }
    }

    _handleKeyUp  (event) {

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
                break;
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

        this.setState(prevState => {
            return {
                playerX: prevState.playerX + this.state.horSpeed,
                playerY: prevState.playerY + this.state.vertSpeed,
            }
        })

        if (this.state.bouncyMode) {
            let vs = this.state.vertSpeed;
            if (vs < this.state.fallSpeedLimit) {
                vs += this.state.fallAcceleration;
            } else {
                vs = this.state.fallSpeedLimit;
            }
            //
            // console.log('this.state.playerY',this.state.playerY); //todo r

            if (this.state.playerY > this.data.boxHeight) {
                vs = -110;
                this.setState({
                    fallAcceleration: 10,
                    fallSpeedLimit: 50
                })
            }
            this.setState({
                vertSpeed: vs
            })
        } else {

        }

        TweenLite.to(this.playerElement, this.data.animationFrequencyMs, {marginLeft: this.state.playerX, marginTop: this.state.playerY, ease: "linear"});


        for (let boxKey in this.state.movingBoxes) {

            let newMovingBoxes = this.state.movingBoxes;
            let currentMovingBox = newMovingBoxes[boxKey];
            // newMovingBoxes[boxKey].x += newMovingBoxes[boxKey].hs;
            let newX = currentMovingBox.x + currentMovingBox.hs;
            // newMovingBoxes[boxKey].y += newMovingBoxes[boxKey].vs;
            let newY = currentMovingBox.y + currentMovingBox.vs;


            let wasCollision = false;

            if (this.state.playerX < newX + this.state.movingBoxWidth &&
                this.state.playerX + this.state.playerWidth > newX &&
                this.state.playerY < newY + this.state.movingBoxHeight &&
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

            if (wasCollision || newX < 0 || newX + 200 > window.innerWidth ||
                newY < 0 || newY + 200 > window.innerHeight
            ) {
                // newMovingBoxes.splice(boxKey, 1);
                // this.movingBoxesRefs.splice(boxKey, 1);
                delete newMovingBoxes[boxKey]
                delete this.movingBoxesRefs[boxKey]
            } else {
                TweenLite.to(this.movingBoxesRefs[boxKey],
                    this.data.animationFrequencyMs,
                    {
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
                <div className="player-div"
                     ref={div => this.playerElement = div}
                    // style={ ({
                    //     marginLeft: this.state.playerX + 'px',
                    //     marginTop: this.state.playerY + 'px'
                    // })}

                ></div>

            </div>

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
