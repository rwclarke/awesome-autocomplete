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
        try {
          this.set('is_open', true);
        } catch(e) {
          console.log(e);
        }
      }

      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        if ((this.current_index + 1) < this.results.length) {
          try {
            this.set('current_index', this.current_index + 1);
          } catch(e) {
            console.log(e);
          }
        }
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        if (this.current_index > 0) {
          try {
            this.set('current_index', this.current_index - 1);
          } catch(e) {
            console.log(e);
          }
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
    try {
      this.set('is_open', false);
    } catch(e) {
      console.log(e);
    }
  },

  onEnterPress() {
    try {
      this.send('select', this.results[this.current_index]);
    } catch(e) {
      console.log(e);
    }
  },

  onKeyup() {
    this.sendAction('search', this.text);
  },

  actions: {

    select(item) {
      try {
        this.set('current_index', 0);
        this.set('is_open', false);
        this.set('text', item[this.fieldname]);
        this.sendAction('onchange', item);
      } catch(e) {
        console.log(e);
      }
    },

    keyup() {
      debounce(this, this.onKeyup, 300);
    },
  }

});
