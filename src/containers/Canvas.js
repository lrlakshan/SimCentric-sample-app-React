import React , { Component } from "react";
import Button from '@material-ui/core/Button';
import { withStyles  } from '@material-ui/core/styles';
import axios from "axios";

const CIRCLE_DRAW = "circleDraw";
const FIGURE_8_DRAW = "figure8Draw";
const RACE_TRACK_DRAW = "racTrackDraw";

var canvas;
var canvasE;
var x, y;
var d = 5;
var width, height;
var data = null;
var i = 0;
var intervalID;

const useStyles = {
    selecetedButton: {
      width: 200,
      marginBottom: 30,
      backgroundColor: '#3f51b5',
      color: '#FFF',
      '&:hover': {
        backgroundColor: '#3f51b5',
    }
    },
    notSelecetedButton: {
      width: 200,
      marginBottom: 30,
    }, 
    button: {
        display: 'flex',
        marginTop: 20
    },
    divider: {
        width: 100,
        height: 'auto',
        display: 'inline-block'
    }
  };


class Canvas extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            clickedBtn: CIRCLE_DRAW 
        };
      }

    
    componentDidMount() {
        this.drawFunction(this.state.clickedBtn);
     }

    drawingTypeSelect = (param) => {
        this.setState({clickedBtn: param});
        this.drawFunction(param);
    }

    drawFunction = (param) => {
        // this.setState({clickedBtn: param});
        canvasE = null;

        canvasE = document.getElementById('game');
        canvas= canvasE.getContext('2d');
        width = canvasE.width;
        height = canvasE.height;
        canvasE.addEventListener("click", onClick, false);
         function loop() {
             clear();
                
             if(data !== null){
                 for (let p = 0; p < 10; p++) {
                     if(i===data.length){
                         i=0;
                     } 

                     x = data[i][0];
                     y = data[i][1];
                     i += 1;
                     
             
                     canvas.beginPath();
                     canvas.fillStyle = "white";
                     canvas.arc(x, y, d, 0, Math.PI*2, true); 
                     canvas.closePath();
                     canvas.fill();  
                 }  
             }
         }


         function clear() {
             canvas.fillStyle="blue";
             canvas.fillRect(0,0,width,height);
         }

         function onClick(e) {
             if(intervalID !== undefined){
                clearInterval(intervalID);
             }
            intervalID = setInterval(loop, 10);
             i = 0;
             data = null;
             var element = canvasE;
             var offsetX = 0, offsetY = 0


                 if (element.offsetParent) {
             do {
                 offsetX += element.offsetLeft;
                 offsetY += element.offsetTop;
             } while ((element = element.offsetParent));
             }

             x = e.pageX - offsetX;
             y = e.pageY - offsetY;
                 axios.get("http://localhost:8080/" + param + "/" + x + "/" + y )
                     .then((response ) =>  {

                         data = response.data.array;
                         
                     })
                     .catch((error) => {
                         console.log(error);
                     });
            canvasE.removeEventListener("click", onClick);
         }

    }


    render(){
        const { classes } = this.props;

        return(
            <div>
                <div className={classes.button}>
                    <Button
                        className={this.state.clickedBtn === CIRCLE_DRAW ? classes.selecetedButton : classes.notSelecetedButton} 
                        variant="outlined" 
                        size="large" 
                        color="primary" 
                        onClick={() => this.drawingTypeSelect(CIRCLE_DRAW)}>
                    Circle</Button>
                    <div className={classes.divider} />
                    <Button
                        className={this.state.clickedBtn === FIGURE_8_DRAW ? classes.selecetedButton : classes.notSelecetedButton} 
                        variant="outlined" 
                        size="large" 
                        color="primary" 
                        onClick={() => this.drawingTypeSelect(FIGURE_8_DRAW)}>
                    Figure 8</Button>
                    <div className={classes.divider} />
                    <Button
                        className={this.state.clickedBtn === RACE_TRACK_DRAW ? classes.selecetedButton : classes.notSelecetedButton} 
                        variant="outlined" 
                        size="large" 
                        color="primary" 
                        onClick={() => this.drawingTypeSelect(RACE_TRACK_DRAW)}>
                    Race Track</Button>
                </div>
                <canvas id="game" width={1200} height={800} />
                
            </div>
        );
    }
}

export default withStyles(useStyles)(Canvas);