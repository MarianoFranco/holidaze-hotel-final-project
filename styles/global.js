import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
:root{  
    --font-body: Merriweather, Arial, sans-serif;
    --font-headings: Montserrat, Arial, serif;

    /* FONT SIZES */
    --font-size-base: 16px;    
    --font-size-sm: 0.618rem;
    --font-size: 1rem;
    --font-size-md: 1.618rem;
    --font-size-lg: 2.618rem;
    --font-size-xl: 4.236rem;
    --font-size-xxl: 6.854rem;
    
  
    /* SPACING */
    
    --size-sm: 8px;
    --size: 16px;
    --size-md: 26px;
    --size-lg: 42px;
    --size-xl: 68px;
    --size-xxl: 110px;   

    /* COLORS */
    --color-primary: #DACABA;
    --color-secondary: #2E658C;
    --color-tertiary: #5884A3;   
    --color-white: #fff;
    --color-black: #00192C;

    /*COLORS WITH OPACITY*/

    --color-tertiary-80: rgba(46, 101, 140, 0.8);

    /* Animation speed */
    --speed-base: 300ms;
    --speed-fast: 120ms;
    --speed-medium: 200ms;
    --speed-slow: 500ms;
  
    --animate-duration: var(--speed-base);
    --animate-delay: var(--speed-fast);
  
  
}
html {
    font-family: var(--font-headings);
    font-size: var(--font-size-base);
    scroll-behavior: smooth;
    
}
body{
      width:100%;
     
}
a {
    color: inherit;
    text-decoration: none;
  }  

*,
*:before,
*:after {
  box-sizing: border-box;
  padding:0; 
  margin: 0; 
}

`;

export default GlobalStyle;