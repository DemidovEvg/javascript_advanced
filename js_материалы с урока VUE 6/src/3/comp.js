Vue.component('mycomp',{
    data(){
      return {
          name: 'Иван',
          age:25,
      }
    },
    template: `<div>
                <div> 
                    <h1>Привет, {{ name }}!!! Ваш возраст {{ age }}</h1>                  
               </div>
               <div> 
                    <h1>Добрый день, {{ name }}!!! Ваш возраст {{ age }}</h1>                  
               </div>
               </div>
                `
});
