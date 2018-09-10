// 定义一个混入对象
const myMixins = {
    created() {
         this.hello();
    },
    methods:{
        hello(){
            console.log("hello from mixins");
        }
    }
}