# 03 - Component Communication Exercises

## Exercise 01

Breidt het Web Component `<light-switch>` uit zodat de property `on` wordt gereflecteerd als `on` attribuut op het component. Pas de code zodanig aan dat het klikken op de button ervoor zorgt dat het `on` attribute toegevoegd wordt aan het component, dan wel verwijdert wordt van het component.

Maak de exercise in de `index.html` en `index.js` file in de directory `exercise-01`.


## Exercise 02

Schrijf een Web Component genaamd `<to-do-list>`. Het component geeft een lijst met verschillende items weer. De `index.html` file en de eerste opzet van `index.js` zijn gegeven. 

Het Web Component moet de items als `this._todos` property hebben en bevat uiteindelijk de volgende HTML:

```
<to-do-list>
    <h1>To do</h1>
    <ul id="todos">
        <li>Read a book</li>
        <li>Finish assignments</li>
        <li>Walk the dog</li>
        <li>Make lunch</li>
    </ul>
</to-do-list>
```

## Exercise 03

Het Web Component `to-do-list` uit Exercise 02 is uitgebreid. Het is nu mogelijk om een item toe te voegen.

Er is ook een tweede Web Component `<to-do-item>` toegevoegd. Het component `<to-do-list>` gebruikt dit component om de verschillende to do items te renderen. Het component `<to-do-item>` bevat de volgende attributen:

- checked: geeft aan of het item wel/niet afgevinkt is. Dit is een boolean attribuut
- text: bevat de tekst van het to do item
- index: bevat de index van het to do item

De tekst van de items is momenteel `undefined`. Zorg er binnen het `<to-do-item>` component voor dat veranderingen van de text geobserveerd worden, zodat voor elk item de juiste tekst getoond wordt.

De gebruiker moet bij elk to do item kunnen aangeven of het afgehandeld of niet afgehandeld is:
- Het `to-do-item` component moet hiervoor een custom event verzenden/dispatchen. Noem het custom event `onToggle`. Geef het index attribuut mee als `detail`, zodat het `to-do-list` component op basis van deze index het juiste item kan opzoeken. 
- Binnen het `to-do-list` component moet er naar dit custom event geluisterd worden en de functie `_toggleToDo()` worden uitgevoerd.
- Implementeer de functionaliteit van de `_toggleToDo()` functie door de `checked` property van het juiste to do item te updaten.
