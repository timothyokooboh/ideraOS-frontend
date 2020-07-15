module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  }
}