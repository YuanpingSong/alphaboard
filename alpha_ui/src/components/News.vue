<template>
    <div class="News">
        <v-layout row wrap>


            <v-flex sm6 class="pa-5" v-for="card in cards">
                <v-card dark>
                    <v-img
                            :src="card.imageSrc"
                            aspect-ratio="2.75"
                            height="300"
                    ></v-img>

                    <v-card-title primary-title>
                        <h3 class="headline" style="margin-bottom: 8px">{{card.title}}</h3>
                        <div class="text-truncate"> {{ card.body }} </div>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn :href="card.url" flat color="blue darken-2">READ</v-btn>
                    </v-card-actions>

                </v-card>
            </v-flex>


        </v-layout>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata nejjjjjsgfdsjgfjds ufhjsdgfds.',
                cards: [
                    {
                        imageSrc: '',
                        title: '',
                        body: '',
                        url: '',
                    },
                ],
            }
        },
        async mounted () {
            await this.getNews();
        },
        methods: {
            getNews: async function () {
                try {
                    let res = await fetch('/news');
                    var json = await res.json();
                } catch (err) {
                    console.log('fetch news failed due to ' + err.message())
                }
                this.cards = json;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .no-decoration {
        text-decoration: none;
    }

</style>
