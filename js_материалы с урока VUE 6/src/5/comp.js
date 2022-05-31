Vue.component('mycomp',{
    props:['name','x','title'],
    data(){
      return {
          name: 'Иван',
          age:25,
      }
    },
    template: `
                <div> 
                    <h1>Привет, {{ name }} и {{ $data.name }}!!! Ваш возраст {{ age }}</h1>
                    <h2>Из верстки поступили данные: x = {{ x }};title = {{ title }}</h2>                  
               </div>
                `
});
