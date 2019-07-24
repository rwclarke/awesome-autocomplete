awesome-autocomplete
==============================================================================

An ember add-on to allow you to easily add integrate an autocomplete input field that can easily be tied into any backend api. Ie. Google Places, your owner server, anything. 

Installation
------------------------------------------------------------------------------

```
ember install awesome-autocomplete
```


Usage
------------------------------------------------------------------------------

Controller:
```
--
selectedText: "Bojack Horseman",
data: [
  {
    id: 1,
    name: 'Bojack Horseman'
  },
  {
    id: 2,
    name: 'Billy Bee'
  },
  {
    id: 3,
    name: 'Rick Sanchez'
  }
],

onChange(value) {
  /* query your api with the value 
    const data = await fetch(`https://yourawesomeapi.com/lookup?q=value`);
    this.set('data', data);
  */
},

onSelected(item) {
  this.set('selectedText', item.name);
  /* do something with the item */
},
```

Handlebars Component:
```
--
{{awesome-autocomplete 
  id='aa9eb49d-16f3-4ba2-974d-29baecfddc03' /* unique id for the component */
  fieldname="name" /* the key to display in the input */
  results=data /* the search results from your API */
  search=(action "onChange") /* the action to be called when a user types defaults at 300ms debounce */
  onchange=(action "onSelected") /* the action to be called after a user select item */
  placeholder="Type to search"
  text=selectedText /* the default text for the input / you should assign this value after on change */
}}
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd awesome-autocomplete`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
