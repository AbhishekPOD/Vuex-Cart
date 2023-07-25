
const store = new Vuex.Store({
    state : {
        products : [],
        count : 0,
        total : 0,
    },

    getters : {
        get_products : function (state) {
            return state.products;
        }
    },

    mutations : {
        update_count(state, count) {
            state.count += count;
        },

        update_total(state, obj) {
            console.log(obj.count, obj.price);
            state.total += obj.count * obj.price;
        },

        update_products(state, data) {
            state.products = data;
        }
    },

    actions : {
        fetch_products : function (context) {
            // context.commit("kwabjkwba", iwqgfujgqw)

            fetch("http://127.0.0.1:8000/data.json").then(response => response.json()
            ).then(data => {
                console.log(data);
                context.commit("update_products", data)
            });
        }
    }
})


Vue.component("product", {
    data : function () {
        return {
            count : [],
        }
    },

    template : `
                <div class = "row">
                    <div class="card my-2 col-4" v-for="product in products">
                        <div class="card-body">
                            <h5 class="card-title">Product Name : {{product.title}}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">Product Price : {{product.price}}</h6>
                            <input type = "number" v-model.number = "count[product.id]" />
                            <button class="card-link my-3" @click = "update_store(count[product.id], product.price)">Add to Cart</button>
                        </div>
                    </div>
                </div>
    `,

    computed : {
        products : function () {
            // return this.$store.state.products;
            return this.$store.getters.get_products;
        }
    },

    methods : {
        update_store : function (count, price) {
            this.$store.commit("update_count", count);
            this.$store.commit("update_total", {"count" : count, "price" : price})
            // store.state.count += count
        },
    }
})


new Vue({
    el : "#vuex-app",

    store, // store : store
    
    data : {
        test_data : "Test Data"
    },

    computed : {
        // get_data : function () {
        //     return store.state.test_data;
        // }

        get_total_products : function () {
            return this.$store.state.count;
        },

        get_cart_total : function () {
            return this.$store.state.total;
        }
    },

    methods : {

    },

    mounted () {
        this.$store.dispatch("fetch_products")
    }
})

// Access State Variables
// this.$store.state.test_data
// store.state.test_data