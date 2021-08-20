import React from 'react'

const Quote = ({quote}) => {
    return ( 
        <div className="app">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
                alt="logo"
            />
            <br></br>
                <button className="btn btn-primary"> Get Another </button>
                <p>
                    {quote.quote} <br />
                    <span> - {quote.author}</span>                    
                </p>
        </div>
     );
}
 
export default Quote;