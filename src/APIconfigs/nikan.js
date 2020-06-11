                const canvas = this.refs.canvas;
                canvas.addEventListener("mousedown", getPosition, false);
                const context = canvas.getContext("2d");

                function clear() {
                    context.fillStyle = "white";
                    context.fillRect(0,0,canvas.width, canvas.height);
                    // context.clearRect(0, 0, canvas.width, canvas.height);
                }

                function loop() {
                    
                }

                function getPosition(event) {

                    clear();
                    let x = event.x;
                    let y = event.y;

                    x -= canvas.offsetLeft;
                    y -= canvas.offsetTop;

                    let posX = 20,
                        posY = 100,
                        i = 0;

                // const objects = [];

                axios.get("http://localhost:8080/" + param + "/" + x + "/" + y )
                    .then((response ) =>  {
                        // console.log(response.data.array.length);

                        let data = response.data.array;
                        console.log("data", data);

                        setInterval(function() {

                            for (let p = 0; p < 1; p++) {
                                // clear();
                                if(i===data.length){
                                    i=0;
                                } 

                                posX = data[i][0];
                                posY = data[i][1];
                                i += 1;
                                
                        
                                // Draw a circle particle on the canvas
                                context.beginPath();
                                context.fillStyle = "blue";
                                // draw your desired shape on canvas
                                context.arc(posX, posY, 5, 0, Math.PI*2, true); 
                                context.closePath();
                                context.fill();  
                            }          
                        }, 10); 
                        
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }