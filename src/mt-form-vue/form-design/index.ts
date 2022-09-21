import { App } from 'vue'
import FormDesign from "./src/index.vue";

export default {
    install(app: App) {
        app.component('mt-form-design', FormDesign)
    }
}
