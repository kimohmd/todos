import Vue from 'vue';


const defaultBackgroundColor = 'yellow'
const defaultText = 'yellow'
const newvalue = ''

export const Background = {
  bind(el: any, binding: any, vnode: any) {
    // el might not be present for server-side rendering.
    if (el) {
      // Set the element's background color.
      el.style.backgroundColor = binding.expression || defaultBackgroundColor
      el.innerHTML =  'Mon texte est de couleur :   ' + (binding.expression || defaultText)
      
    }
  }, 
};
Vue.directive('background', Background);
