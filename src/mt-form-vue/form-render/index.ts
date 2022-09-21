import { App } from 'vue'
import FormRender from "./src/index.vue";
export default {
    install(app: App) {
        app.component('mt-form-render', FormRender)
    }
}
