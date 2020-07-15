<template>
  <div class="home">
    <div class="intro-container">
      <div class="intro">
        <div>

           <p>
            <a href="" style="text-align: center;" class="typewrite" data-period="2000" data-type='[ "TECHNOLOGY.", "INFORMATION.", "BUSINESS." ]'>
            <span class="wrap"></span>
            </a>
          </p>

          <h1 class="pb-3">
            BUILT FOR ENTREPRENEURS <v-icon color="#FFFFFF">mdi-school</v-icon>
          </h1>

          <div>
            Get access to unlimited analytic tools, journals, and business insights needed to grow your brand.
          </div>
          <div>
            Our team of business analysts, seasoned copywriters and product development executives have exactly what you need to scale your business.
          </div>

          <v-btn outlined="" color="#232647" class="my-5 white--text font-weight-bold" to="/register">
            <span>GET STARTED</span>
            <v-icon right>mdi-gesture-double-tap</v-icon>
          </v-btn>

        </div>
      </div>
    </div>

    <h1 class="text-center pt-5" id="why-join">
      Why Join IderaOS?
    </h1>

    <div class="benefits-container">
      <div v-for="(benefit, index) in benefits" :key="index" class="ma-5">
        <v-card width="200" flat>
          <v-card-title>{{benefit.name}}</v-card-title>
          <v-avatar tile width="100%" height="100">
            <v-img :src="benefit.image"></v-img>
          </v-avatar>
          <v-card-text>
            <div class="text-center">{{benefit.text}}</div>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <div class="text-center mb-5">
      <v-btn outlined to="/register">
        Join now
      </v-btn>
    </div>
  
  </div>
</template>

<script>
// @ is an alias to /src
//import {gsap} from "gsap"


export default {
  name: "Home",
  data() {
    return {
      i: 0,
      txt: "TECHNOLOGY.",
      speed: 50,
      myName: "",
      benefits: [
        {
          text: "Drive sales for your business by taking advantage of modern digital technologies",
          image: "tech.jpg",
          name: "Technology"
        },
        {
          text: "Information is power. Utilize our in-demand analytic softwares to understand and predict customer behaviour.",
          image: "behaviour.jpeg",
          name: "Information"
        },
        {
          text: "Grow your professional network by being a part of our ever growing community of business executives",
          image: "network.jpg",
          name: "Network"
        }
      ]
    }
  },

  methods: {
    getName(event, value) {
      this.myName = value
      console.log(value)
    },
    typeWriter() {
      if(this.i < this.txt.length) {
        document.getElementById("text").innerHTML += this.txt.charAt(this.i);
        this.i++;
        setTimeout(this.typeWriter, this.speed);
      }
    },
   
  },

  mounted() {
    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<div class="wrap;">'+this.txt+'</div>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    var elements = document.getElementsByClassName('typewrite');
      for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    

  }
};
</script>
<style scoped>

  .intro-container {
    background-color: #3888D7
  }

  .intro {
    text-align: center;
    max-width: 700px;
    margin: auto;
    padding: 30px 10px;
    color: #FFFFFF;
  }
  .intro a {
    text-decoration: none;
  }
  #text {
    color: #FFFFFF;
    text-align: center;
    padding-top: 40px;
  }
  .typewrite {
    color:#fff; 
    text-decoration: none;
  }
  .wrap {
    text-align: center;
  }
  #why-join {
    color: #3888D7
  }
  .benefits-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
