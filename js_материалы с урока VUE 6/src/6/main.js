const app = new Vue({
    el: "#app",
    data:{
        name:'Олег',
        name2:'Анна'
    },
    methods:{
        test(age){
            alert(`Имя пользователя: ${this.name}, возраст ${age}`)
        }
    }
});