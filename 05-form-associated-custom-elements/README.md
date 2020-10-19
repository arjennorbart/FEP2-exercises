# 05 - Forms Deep Dive

## Exercise 01

Het component `<my-counter>` is een variant op `<input type="number">`, met als aanvulling dat de eindgebruiker met de `+` en `-` buttons de waarde met een bepaalde stap kan vergroten/verkleinen.
De developer kan de stapgrootte bepalen door het zetten van het `step` attribuut.

Schrijf het component om zodat het custom element geassocieerd worden met het formulier. Zorg ervoor dat:
- de `value` van de `input` wordt meegesturd op een `form submit`,
- het formulier gevalideerd wordt: de input mag geen negatief getal bevatten.
- het formulier wordt gereset wanneer de gebruiker op `<button type="reset">` klikt.

Controleer of je het component op de juiste manier aan het formulier hebt geassocieerd,
door na het verzenden van het formulier in de Network tab van de Developer Tools te bekijken of de juiste headers worden meegestuurd.