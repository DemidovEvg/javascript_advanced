Vue.component('mycomp',{
    data(){
      return {
          name: 'Иван',
          age:25,
          show:false
      }
    },
    template: `<div> 
                    <h1 v-show="show">Привет, {{ name }}!!! Ваш возраст {{ age }}</h1>
                    <inner-comp></inner-comp>
               </div>
                `
});

Vue.component('inner-comp',{
    data(){
        return {
            counter: 0
        }
    },
    template: ` <div> 
                    <button @click="$parent.show=!$parent.show">Push {{ counter }}</button>
                    <button @click="increase($parent.age);$parent.age=counter;">Push2 {{ counter }}</button>
                </div> 
              `,
    methods:{
        increase(step){
            this.counter += step;
        }
    }
});