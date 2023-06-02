class ColorCard { // class for the color card 
    id;
    color;
    addToList;
    htmlElement;
    circle;
    text;

    constructor(newId, newColor, addToList) {
        // setting properties 
        this.id = newId;
        this.color = newColor;
        this.addToList = addToList;

        // make htmlElement to render 
        this.htmlElement = document.createElement("li"); // create a li element in the html
        this.htmlElement.classList = "colors__color"; // create a class in the html

        this.circle = document.createElement("figure"); // create a figure element in the html
        this.circle.classList = "colors__circle"; // create a class in the html
        this.circle.style.background = this.color; 

        this.text = document.createElement("p"); // create a p element in the html
        this.text.innerText = "Copied"; // text for in the html 
        this.text.classList = "colors__text"; // create class for in the html

        this.htmlElement.onclick = this.onHTMLElementClicked; 
        // finally render 
        this.render();
    }

    onHTMLElementClicked = () =>{ // function for clicking on the card
        this.circle.classList.add("colors__circle--selected"); // adds the class once html element is clicked
        document.title = this.color;
        window.navigator.clipboard.writeText(this.color); // copies the color/hsl to your keyboard
    }

    render() { // render function that creates the html element with the text and the circle element
        this.htmlElement.appendChild(this.circle);
        this.htmlElement.appendChild(this.text);
        this.addToList.appendChild(this.htmlElement);
    }
}

class ColorList { // class for the color list 
    id; // id
    htmlElement; // a html element

    constructor(newId){
        this.id = newId; 
        this.htmlElement = document.createElement("ul"); // create a ul element in the html
        this.htmlElement.id = this.id;
        this.htmlElement.classList.add("colors"); // create a class in the html
        this.render(); // execute the render function
    }

    render(){ // render funtion 
        document.querySelector("body").appendChild(this.htmlElement);
    }
}

class HSLGenerator{ // class for the color generator 
    randomHue;
    randomSaturation;
    randomLightness;
    hsl;

    constructor(){
        this.generateHSL();
    }

    generateHue = function(){ // function that generates the hue
        this.randomHue = Math.floor(Math.random() * (360 - 1) + 1); // generate a random number for the hue
    }

    generateSaturation = function(){ // function that generates the saturation
        this.randomSaturation = Math.floor(Math.random() * (79 - 11) + 11) + "%"; // generate a random number for the saturation
    }

    generateLightness = function(){ // function that generates the lightness
        this.randomLightness = Math.floor(Math.random() * (100 - 11) + 11) + "%"; // generate a random number for the lightness
    }

    generateHSL = function(){ // function that uses the generated hue, saturation and lightness
        this.generateHue(); // using the function generateHue
        this.generateSaturation(); // using the function generateSaturation
        this.generateLightness(); // using the function generateLightness
        this.hsl = `hsl(${this.randomHue}, ${this.randomSaturation}, ${this.randomLightness})` // uses the results of each function to make a hsl color
    }
}

class App{ // class for the app
    id;
    ColorList;
    hslGenerator;

    constructor(newId){
        this.id = newId;
        this.colorList = new ColorList(this.id); 
        this.hslGenerator = new HSLGenerator();
        this.generateColorCards(); // using the function generateColorCards
    }

    generateColorCards = function(){
        for(let i = 1; i <= 100; i++){ // a for loop so it can loop through the 100 generated colors
            this.hslGenerator.generateHSL(); // uses the function generateHSL that made a random hsl color
            new ColorCard(i, this.hslGenerator.hsl, document.getElementById(this.colorList.id)); // the color card will display the generated hsl color 
        }        
    }
}

const app = new App("js--app");
