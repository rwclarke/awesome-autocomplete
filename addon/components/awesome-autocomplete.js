import Component from '@ember/component';
import layout from '../templates/components/awesome-autocomplete';
import { debounce } from '@ember/runloop';

export default Component.extend({

  layout: layout,
  fieldname: "name", 
  results: [], 
  placeholder: "Type to search",
  id: 'awesome',
  selected: null,
  text: null,
  is_open: false,
  current_index: 0,
  
  didInsertElement() {
    this._super(...arguments);    
    document.addEventListener("click", (e) => {
      if (e.target.id !== `${this.id}-autocomplete`) {
        this.onBlur(); 
      }
    });
    document.getElementById(`${this.id}-autocomplete`).addEventListener("keydown", (e) => {

      if (e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 13) {
        document.getElementById(`${this.id}-autocomplete`).focus();
        this.set('is_open', true);
      }

      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        if ((this.current_index + 1) < this.results.length) {
          this.set('current_index', this.current_index + 1);
        }
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        if (this.current_index > 0) {
          this.set('current_index', this.current_index - 1);
        }
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        document.getElementById(`${this.id}-autocomplete`).blur();
        this.onEnterPress();
      }
    });
  },

  onBlur() {
    this.set('is_open', false);
  },

  onEnterPress() {
    this.send('select', this.results[this.current_index]);
  },

  onKeyup() {
    this.sendAction('search', this.text);
  },

  actions: {

    select(item) {
      this.set('current_index', 0);
      this.set('is_open', false);
      this.set('text', item[this.fieldname]);
      this.sendAction('onchange', item);
    },

    keyup() {
      debounce(this, this.onKeyup, 300);
    },
  }

});
