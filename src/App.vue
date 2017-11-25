<template>
  <v-app>
    <!-- <v-navigation-drawer
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
    </v-navigation-drawer> -->
    <v-toolbar fixed app :clipped-left="clipped">
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn> -->
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
       <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <mapbox
        access-token="pk.eyJ1Ijoic2NvdDMwMDQiLCJhIjoiY2phYmJuNDhrMTBwbzMzbGliajd4ZGI1MiJ9.7coysMcZvUjSo7kEdc7fzA"
        :map-options="{
          style: 'mapbox://styles/mapbox/light-v9',
          center: [-74.809,10.962],
          zoom: 11.5
        }"
        @map-load="mapLoaded"
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
    },
    methods: {
      mapLoaded(map) {
        //Add a geojson point source.
        //Heatmap layers also work with a vector tile source.
        map.addSource('earthquakes', {
          "type": "geojson",
          "data": "delitos.geojson"
        });

        map.addLayer({
          "id": "earthquakes-heat",
          "type": "heatmap",
          "source": "earthquakes",
          "maxzoom": 15,
          "paint": {
            //Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": {
              "property": "mag",
              "type": "exponential",
              "stops": [
                [0, 0],
                [6, 1]
              ]
            },
            //Increase the heatmap color weight weight by zoom level
            //heatmap-ntensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": {
              "stops": [
                [0, 1],
                [9, 3]
              ]
            },
            //Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            //Begin color ramp at 0-stop with a 0-transparancy color
            //to create a blur-like effect.
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(33,102,172,0)",
              0.2, "rgb(103,169,207)",
              0.4, "rgb(209,229,240)",
              0.6, "rgb(253,219,199)",
              0.8, "rgb(239,138,98)",
              1, "rgb(178,24,43)"
            ],
            //Adjust the heatmap radius by zoom level
            "heatmap-radius": {
              "stops": [
                [0, 2],
                [9, 20]
              ]
            },
            //Transition from heatmap to circle layer by zoom level
            // "heatmap-opacity": {
            //   "default": 1,
            //   "stops": [
            //     [7, 1],
            //     [9, 0]
            //   ]
            // },
          }
      }, 'waterway-label');

      map.addLayer({
        "id": "earthquakes-point",
        "type": "circle",
        "source": "earthquakes",
        "minzoom": 14,
        "paint": {
            //Size circle raidus by earthquake magnitude and zoom level
            "circle-radius": {
                "property": "mag",
                "type": "exponential",
                "stops": [
                    [{ zoom: 7, value: 1 }, 1],
                    [{ zoom: 7, value: 6 }, 4],
                    [{ zoom: 16, value: 1 }, 5],
                    [{ zoom: 16, value: 6 }, 50],
                ]
            },
            //Color circle by earthquake magnitude
            "circle-color": {
                "property": "mag",
                "type": "exponential",
                "stops": [
                    [1, "rgba(33,102,172,0)"],
                    [2, "rgb(103,169,207)"],
                    [3, "rgb(209,229,240)"],
                    [4, "rgb(253,219,199)"],
                    [5, "rgb(239,138,98)"],
                    [6, "rgb(178,24,43)"]
                ]
            },
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
            //Transition from heatmap to circle layer by zoom level
            "circle-opacity": {
                "stops": [
                    [7, 0],
                    [8, 1]
                ]
            }
          }
        }, 'waterway-label');
      }
    }
  }
</script>
