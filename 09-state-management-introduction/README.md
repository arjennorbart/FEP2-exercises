# 09 - State Management Introduction

## Exercise 01

We gaan onze eigen state management oplossing schrijven naar het model van Redux.
Deze oplossing bestaat uit een store met state, de actions die op die state uit 
te voeren zijn en een reducer die de aanpassingen daadwerkelijk uitvoert.

Opdrachten:
1. In `exercise-01/store.js` vind je de aanwijzingen om de store te bouwen
2. In `exercise-02/actions.js` vind je de aanwijzingen om drie actions te maken
3. In `exercise-03/reducer.js` vind je de aanwijzingen om een reducer te maken


## Exercise 02

Zoals je gezien hebt in Exercise 01 bestaat de state enkel uit een nummer. De 
huidige waarde van de counter. We gaan de state nu verder uitbouwen door ook 
een menu toe te voegen die open en dicht kan. 

De state wordt nu dus een object met twee properties: `counter` en `menu`.

Je ziet dat de actions gesplitst zijn in files naar onderwerp. Op deze manier 
is in het gebruik van de actions goed te zien waar ze bij horen. We kunnen 
namelijk het statement `store.dispatch(menu.open())` gebruiken om het menu te 
openen. Het beschrijft precies WAT er met WIE gebeurd.

Echter, we zitten nog met één enkel state object met twee properties. De store 
accepteert ook maar één reducer. 

Opdrachten:
1. Herschrijf de reducer zo dat de actions voor `counter` en `menu` elk door hun
   eigen functie worden afgehandeld. Bedenk wel dat er maar één main reducer
   aan de store gegeven kan worden. én dat die main reducer de HELE state terug
   moet geven.
2. In Exercise 01 heb je de actions voor de counter geimplementeerd. Implementeer deze nu
   de juiste file. Implementeer ook de actions voor het menu.
3. Implementeer in `store.js` alle methods van de store, zoals je dat in Exercise 01 gedaan hebt.