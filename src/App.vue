<template>
  <v-app>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile 
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
       <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <mapbox 
        access-token="pk.eyJ1Ijoic2NvdDMwMDQiLCJhIjoiY2phYmJuNDhrMTBwbzMzbGliajd4ZGI1MiJ9.7coysMcZvUjSo7kEdc7fzA"
        :map-options="{
          style: 'mapbox://styles/mapbox/light-v9',
          center: [-74.809,10.962],
          zoom: 11.5
        }"
      >
      </mapbox>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Mapbox from 'mapbox-gl-vue';
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'child_care', title: 'Edades' },
          { icon: 'gavel', title: 'Delitos' },
          { icon: 'wc', title: 'Genero' },
          { icon: 'date_range', title: 'Año' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Delitos que involucran menores de edad en Barranquilla'
      }
    },
    components: {
      Mapbox
    }
  }
</script>
