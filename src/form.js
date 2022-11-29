import Vue from 'vue'
import VueForm from 'vue-form'

let options = {
    validators: {
        'solo-numeros' : function(value) {
            let regex = /^[0-9]+$/
            return regex.test(value)
        }
    }
}

Vue.use(VueForm, options)
