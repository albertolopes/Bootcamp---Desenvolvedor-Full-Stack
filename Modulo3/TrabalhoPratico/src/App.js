import React, { Component } from "react";
import AnyText from "./components/AnyText";
import ShowFormatText from "./components/ShowFormatText";

export function numericText(anyText){
  let text = anyText.toUpperCase();
  text = text.replace(/O/g,"0");
  text = text.replace(/L/g,"1");
  text = text.replace(/E/g,"3");
  text = text.replace(/A/g,"4");
  text = text.replace(/S/g,"5");
  text = text.replace(/T/g,"7");
  return text;
}

export function csvFormat(anyText){
  let text = anyText.split(" ");
  let array = text.map(t => `"${t}"`);
  return array.join(";");
}

export function slugFormat(anyText){
  let text = anyText.split(" ");
  return text.join("-");
}

export function variableFormat(anyText){
  let text = anyText.split(" ");
  let array = [];
  for (let e = 0; e < text.length; e++) {
    if(e >= 1){
      array.push(text[e].charAt(0).toUpperCase() + text[e].substr(1))
    } else {
      array.push(text[e].toLowerCase());
    }                
  }
  return array.join("")
}

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      text: "",
      inverseText: "",
      numericText: "",
      csv: "",
      slug: "",
      onlyVowels: "",
      onlyConsonant: "",
      variable: ""
    };
  }

  handleChangeText = (anyText) => {
    let inverse = anyText.split('').reverse().join('');

    let numeric = numericText(anyText);

    let csv = csvFormat(anyText);

    let slug = slugFormat(anyText);
    
    let vowel = anyText.replace(/[bcdfghjklmnpqrstvwxz]/gi,'')

    let consonantes = anyText.replace(/[aeiouà-ú]/gi,'');
    
    let variable = variableFormat(anyText);

    this.setState({
      text: anyText, 
      inverseText: inverse,
      numericText: numeric,
      csv: csv,
      slug: slug,
      onlyVowels: vowel,
      onlyConsonant: consonantes,
      variable: variable
    });
  };

  render() {
    const { 
      text, 
      inverseText, 
      numericText, 
      csv, 
      slug, 
      onlyVowels, 
      onlyConsonant,
      variable 
    } = this.state;

    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React-text-transformer</h1>
        
        <AnyText text={text} onChangeText={this.handleChangeText} />

        <h1 style={styles.centeredTitle}>transformer</h1>

        <ShowFormatText title={"Texto invertido"} text={inverseText}/>
        <ShowFormatText title={"Texto numérico"} text={numericText}/>
        <ShowFormatText title={"CSV"} text={csv}/>
        <ShowFormatText title={"Slug"} text={slug}/>
        <ShowFormatText title={"Somente vogais"} text={onlyVowels}/>
        <ShowFormatText title={"Somente consoantes"} text={onlyConsonant}/>
        <ShowFormatText title={"Variável"} text={variable}/>
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};

