const SignInComponent = ( 'sign-in-with-email', {
    data: function () {
        return {
            password: null,
            email: '',
            alert: false
        }
    },
    computed: {
        error: () => this.$store.getters.getError,
        loading: () => this.$store.getters.getLoading
    },
    watch: {
        error: value => { this.alert = !!value },
        alert: value => {
            value ? return : this.$store.dispatch ( 'setError', false )
        }
    },
    methods: {
        userSignIn () {
            this.$root.$store.dispatch ( 'userSignIn', {
                  email: this.email,
                  password: this.password
            })
        }
    },
    template: `
      <v-layout column>
        <v-flex xs12 class="text-xs-center" mt-5>
          <h3>Sign In</h3>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
          <form @submit.prevent = "userSignIn">
            <v-layout column>
              <v-flex>
                  <v-alert error dismissible v-model = "alert">
                        {{ error }}
                  </v-alert>
              </v-flex>
              <v-flex>
                  <v-text-field
                      name = "email"
                      label = "Email"
                      id = "email"
                      type = "email"
                      v-model = "email"
                      required>
                  </v-text-field>
              </v-flex>
              <v-flex>
                  <v-text-field
                      name = "password"
                      label = "Password"
                      id = "password"
                      type = "password"
                      v-model = "password"
                      required>
                  </v-text-field>
              </v-flex>
              <v-flex class="text-xs-center" mt-5>
                  <v-btn icon primary type="submit" :disabled="loading">
                        <v-icon>exit_to_app</v-icon>
                  </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    `
})
