/**
 * Dit is de store.
 * De store is een functie die een reducer accepteert als argument en een object
 * met een aantal methods terug geeft.
 * 
 * De store functie bevat verder de state en een array van listener functions.
 * De listeners zijn functies die gecalled worden nadat er een actie 
 * ge-dispatched is.
 * 
 * Opdracht:
 * Implementeer alle methods van de store
 */
export default (reducer) => {
  /** Placeholder variabele voor de state */
  let state

  /** Een array van alle listener functies */
  let listeners = []

  /**
   * `getState`
   * 
   * @returns De huidige state
   */


  /**
   * `dispatch`
   * Deze functie doet het volgende:
   * 1. Accepeert een action object
   * 2. Called de reducer met de huidige state en het action object
   * 3. Reassigned de state met de return value van de reducer
   * 4. Loopt over de listeners array en called elke listener
   * 
   * @param {Object} action Een action object
   */


  /**
   * `subscribe`
   * Deze functie plaatst een functie in de listeners array
   * 
   * @param {Function} listener Een function die gecalled moet worden
   */
  

  dispatch({})

  return { getState, dispatch, subscribe }
}