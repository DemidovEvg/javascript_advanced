Vue.component('mycomp',{
   data(){
      return {
          name: 'Иван',
          age:25,
      }
    },
    template: `
                <div> 
                    <h1>Привет, {{ name }} и {{$parent.name}} </h1>     
                    <inner-comp></inner-comp>       
                    <button @click="$parent.test(age)">OK</button>                  
               </div>
                `
});

Vue.component('inner-comp',{
    template: `<div>
                    <h1>Пользователю {{ $root.name2 }} {{ $parent.age }} лет</h1>
              </div>`
});
