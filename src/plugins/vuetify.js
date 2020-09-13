import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    themes: {
      light: {
        primary: colors.deepOrange.base,
        secondary: colors.amber.base,
        accent: colors.lime.base,
        error: colors.red.base,
        warning: colors.yellow.base,
        info: colors.brown.base,
        success: colors.cyan.base
      },
      dark: {
        primary: colors.blue.lighten3
      }
    }
  }
});
